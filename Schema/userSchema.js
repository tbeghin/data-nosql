const _ = require('underscore');
const q = require("q");
const getData = require('../getData');
const mongoose = require('mongoose');
let modelList = {};

const getSchema = function (dataBase) {
    let defer = q.defer();
    getData.getAll(dataBase, 'schema').then(
        schemas => {
            _.forEach(schemas,
                schema => createModel(schema.name, schema.content)
            );
            defer.resolve(modelList);
        },
        err => {
            defer.reject(err);
        }
    );
    return defer.promise;
};

function createModel(schemaName, schemaObject) {
    let schema = new mongoose.Schema(schemaObject);
    modelList[schemaName] = mongoose.model(schemaName, schema);
}

module.exports.getModel = getSchema;
module.exports.modelList = modelList;