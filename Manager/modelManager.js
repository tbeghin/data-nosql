const _ = require('underscore');
const q = require('q');
const crud = require('../Provider/crud');
const dataBaseManager = require('./dataBaseManager');
const mongoose = require('mongoose');
const schemaTypes = mongoose.Schema.Types;
let modelList = {};

const getModel = function (collection) {
    let defer = q.defer();
    console.log('getModel');
    if (_.isEmpty(modelList)) {
        if (collection === 'schema') {
            console.log('collection is schema, build schema model.');
            addModelToList('schema', {"name": schemaTypes.String, "schema": schemaTypes.Mixed})
        }
        else {
            console.log('modelList empty, get db to build modelList.');
            dataBaseManager.getDataBase()
                .then(
                    dataBase => createModelList(dataBase),
                    err => defer.reject(err)
                )
                .then(
                    () => testModelList(collection, defer),
                    err => defer.reject(err)
                );
        }
    }
    else {
        console.log('modelList Exist -> test if content collection.');
        testModelList(collection, defer);
    }
    return defer.promise;
};

const createModelList = function (dataBase) {
    let defer = q.defer();
    console.log('createModelList');
    crud.getAll(dataBase, 'schema')
        .then(
            schemas => {
                _.forEach(schemas,
                    schema => addModelToList(schema.name, schema.content)
                );
                defer.resolve(modelList);
            },
            err => defer.reject(err)
        );
    return defer.promise;
};

function addModelToList(schemaName, schemaObject) {
    let schema = new mongoose.Schema(schemaObject);
    modelList[schemaName] = mongoose.model(schemaName, schema);
}

function testModelList(collection, defer) {
    if (_.has(modelList, collection)) {
        defer.resolve(modelList[collection]);
    }
    else {
        defer.reject(`No collection name ${collection} in database.`);
    }
}

module.exports.initModel = createModelList;
module.exports.getModel = getModel;