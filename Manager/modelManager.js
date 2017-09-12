const _ = require('underscore');
const q = require("q");
const getData = require('../getData');
const dataBaseManager = require('./dataBaseManager');
const mongoose = require('mongoose');
let modelList = {};

const getModel = function (collection) {
    let defer = q.defer();
    if(_.isEmpty(modelList)){
        let dataBase = dataBaseManager.getDataBase('OUPSSS');
        createModelList(dataBase).then(
            x => {},
            err => {}
        )
    }
    else if(_.has(modelList, collection)) {
        return modelList[collection];
    }
    return defer.promise;
};

const createModelList = function (dataBase) {
    let defer = q.defer();
    getData.getAll(dataBase, 'schema').then(
        schemas => {
            _.forEach(schemas,
                schema => addModelToList(schema.name, schema.content)
            );
            defer.resolve(modelList);
        },
        err => {
            defer.reject(err);
        }
    );
    return defer.promise;
};

function addModelToList(schemaName, schemaObject) {
    let schema = new mongoose.Schema(schemaObject);
    modelList[schemaName] = mongoose.model(schemaName, schema);
}

module.exports.initModel = createModelList;
module.exports.getModel = getModel;