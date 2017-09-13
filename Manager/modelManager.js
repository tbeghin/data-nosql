const _ = require('underscore');
const q = require('q');
const getData = require('../getData');
const dataBaseManager = require('./dataBaseManager');
const mongoose = require('mongoose');
let modelList = {};

const getModel = function (collection) {
    let defer = q.defer();
    if (_.isEmpty(modelList)) {
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
    else {
        testModelList(collection, defer);
    }
    return defer.promise;
};

const createModelList = function (dataBase) {
    let defer = q.defer();
    getData.getAll(dataBase, 'schema')
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

function addModelToList (schemaName, schemaObject) {
    let schema = new mongoose.Schema(schemaObject);
    modelList[schemaName] = mongoose.model(schemaName, schema);
}

function testModelList (collection, defer) {
    if (_.has(modelList, collection)) {
        defer.resolve(modelList[collection]);
    }
    else {
        defer.reject(`No collection name ${collection} in database.`);
    }
}

module.exports.initModel = createModelList;
module.exports.getModel = getModel;