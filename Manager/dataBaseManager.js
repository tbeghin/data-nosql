// Inclusion de Mongoose
const mongoose = require('mongoose');
const _ = require('underscore');
const q = require('q');
const localMongoPath = 'mongodb://localhost';
const dataBasePathTest = 'test';
let dbConnection;

const getDataBase = function (dataBasePath, mongoPath) {
    let defer = q.defer();
    if (_.isUndefined(dbConnection)) {
        if (!_.isEmpty(dataBasePath) && !_.isEmpty(mongoPath)) {
            createDataBase(dataBasePath, mongoPath, defer);
        }
        else {
            defer.reject('Create database connection before.');
        }
    }
    else {
        defer.resolve(dbConnection);
    }

    return defer.promise;
};

const createDataBase = function (dataBasePath, mongoPath, defer) {
    dataBasePath = dataBasePath || dataBasePathTest;
    mongoPath = mongoPath || localMongoPath;
    let connectionPath = `${mongoPath}\\${dataBasePath}`;
    mongoose.createConnection(connectionPath).then(
        db => {
            // console.log('Connection OK');
            dbConnection[dataBasePath] = db;
            defer.resolve(db);
        },
        err => {
            // console.error(`Connection failed : ${err}`);
            defer.reject(err);
        }
    );
};

module.exports.getDataBase = getDataBase;