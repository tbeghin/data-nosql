const _ = require('underscore');
const q = require('q');
const crud = require('../Provider/crud');
const mongoose = require('mongoose');
const dataBaseManager = require('./dataBaseManager');
let modelList = {};

const getModel = function (collection) {
    let defer = q.defer();
    console.log('getModel : ' + collection);
    if (_.isEmpty(modelList)) {
        if (collection === 'schema') {
            console.log('collection is schema, build schema model.');
            addModelToList('schema', {'name': 'string', 'mongoSchema': 'mixed'});
            testModelList(collection, defer);
        }
        else {
            console.log('modelList empty, get db to build modelList.');
            dataBaseManager.getDataBase()
                .then(
                    db => createModelList(db)
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

const createModelList = function (db) {
    let defer = q.defer();
    console.log('createModelList');
    crud.getAll('schema')
        .then(
            schemas => {
                _.forEach(schemas,
                    schema => addModelToList(schema.name, schema.content, db)
                );
                console.log(modelList);
                defer.resolve(modelList);
            },
            err => defer.reject(err)
        );
    return defer.promise;
};

function addModelToList (schemaName, schemaObject, db) {
    let schema = new mongoose.Schema(schemaObject);
    modelList[schemaName] = db.model(schemaName, schema);
}

function testModelList (collection, defer) {
    if (_.has(modelList, collection)) {
        console.log('testModelList : ' + collection);
        defer.resolve(modelList[collection]);
    }
    else {
        defer.reject(`No collection name ${collection} in database.`);
    }
}

module.exports.initModel = createModelList;
module.exports.getModel = getModel;