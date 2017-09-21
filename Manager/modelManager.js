const _ = require('underscore');
const Promise = require('es6-promise').Promise;
const crud = require('../Provider/crud');
const mongoose = require('mongoose');
const dataBaseManager = require('./dataBaseManager');
let modelList = {};

const getModel = function (collection) {
    return new Promise((resolve, reject) => {
        console.log('getModel : ' + collection);
        if (_.isEmpty(modelList)) {
            if (collection === 'schemas') {
                console.log('collection is schemas, build schema model.');
                dataBaseManager.getDataBase()
                    .then(
                        db => addModelToList(collection, {name: 'string', mongoSchema: 'mixed'}, db)
                    )
                    .then(
                        () => testModelList(collection),
                        err => reject(err)
                    )
                    .then(
                        model => resolve(model),
                        err => reject(err)
                    );
            }
            else {
                console.log('modelList empty, get db to build modelList.');
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
                    );
            }
        }
        else {
            console.log('modelList Exist -> test if content collection.');
            testModelList(collection)
                .then(
                    model => resolve(model),
                    err => reject(err)
                );
        }
    });
};

const createModelList = function (db) {
    return new Promise((resolve, reject) => {
        crud.getAll('schemas')
            .then(
                schemas => {
                    _.forEach(schemas,
                        schema => addModelToList(schema.name, schema.content, db)
                    );
                    resolve(modelList);
                },
                err => reject(err))
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
            console.log('testModelList : ' + collection);
            resolve(modelList[collection]);
        }
        else {
            reject(`No collection name ${collection} in database.`);
        }
    });
}

module.exports.initModel = createModelList;
module.exports.getModel = getModel;