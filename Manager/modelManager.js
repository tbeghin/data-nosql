const _ = require('underscore');
const Promise = require('es6-promise').Promise;
const crud = require('../Provider/crud');
const mongoose = require('mongoose');
const dataBaseManager = require('./dataBaseManager');
let modelList = {};

const getModel = function (collection) {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(modelList)) {
            if (collection === 'schemas') {
                dataBaseManager.getDataBase()
                    .then(
                        db => {
                            addModelToList(collection, {name: 'string', mongoSchema: 'mixed'}, db);
                        }
                    )
                    .then(
                        () => testModelList(collection),
                        err => reject(err)
                    )
                    .then(
                        model => resolve(model),
                        err => reject(err)
                    )
                    .catch(
                        exception => reject(exception)
                    );
            }
            else {
                dataBaseManager.getDataBase()
                    .then(
                        db => createModelList(db)
                    )
                    .then(
                        () => testModelList(collection),
                        err => reject(err)
                    )
                    .then(
                        model => resolve(model),
                        err => reject(err)
                    )
                    .catch(
                        exception => reject(exception)
                    );
            }
        }
        else {
            testModelList(collection)
                .then(
                    model => resolve(model),
                    err => reject(err)
                )
                .catch(
                    exception => reject(exception)
                );
        }
    });
};

const createModelList = function (db) {
    return new Promise((resolve, reject) => {
        crud.getAll('schemas')
            .then(
                schemas => {
                    let promises = [];
                    _.forEach(schemas,
                        schema => promises.push(addModelToList(schema._doc.name, schema._doc.mongoSchema, db))
                    );
                    Promise.all(promises);
                },
                err => reject(err)
            )
            .then(
                () => {
                    resolve(modelList);
                },
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

function addModelToList (schemaName, schemaObject, db) {
    return new Promise((resolve, reject) => {
        if (!_.isEmpty(db)) {
            let schema = new mongoose.Schema(schemaObject);
            modelList[schemaName] = db.model(schemaName, schema);
            resolve();
        }
        else {
            reject('No database');
        }
    });
}

function testModelList (collection) {
    return new Promise((resolve, reject) => {
        if (_.has(modelList, collection)) {
            resolve(modelList[collection]);
        }
        else {
            reject(`No collection name ${collection} in database.`);
        }
    });
}

module.exports.initModel = createModelList;
module.exports.getModel = getModel;