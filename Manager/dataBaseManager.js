const mongoose = require('mongoose');
const _ = require('underscore');
let dbConnection;

const getDataBase = function (collectionPath, dataBasePath) {
    return new Promise((resolve, reject) => {
        if (_.isUndefined(dbConnection)) {
            if (!_.isEmpty(collectionPath) && !_.isEmpty(dataBasePath)) {
                createDataBase(collectionPath, dataBasePath);
            }
            else {
                reject('Create database connection before.');
            }
        }
        else {
            console.log('dbConnection exist -> resolve.');
            resolve(dbConnection);
        }
    });
};

const createDataBase = function (collectionPath, dataBasePath) {
    return new Promise((resolve, reject) => {
        let connectionPath = `${dataBasePath}\\${collectionPath}`;
        mongoose.createConnection(connectionPath, {useMongoClient: true}).then(
            db => {
                dbConnection = db;
                resolve(db);
            },
            err => {
                reject(err);
            }
        );
    });
};

module.exports.getDataBase = getDataBase;