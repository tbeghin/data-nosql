// Inclusion de Mongoose
const mongoose = require('mongoose');
const _ = require('underscore');
const q = require('q');
const mongoPath = 'mongodb://localhost';
const dataBasePathTest = 'test';
let dbConnection = {};

const getDataBase = function (dataBasePath) {
    let defer = q.defer();
    if (_.has(dbConnection, dataBasePath)) {
        defer.resolve(dbConnection[dataBasePath]);
    }
    else {
        createDataBase(dataBasePath, defer)
    }

    return defer.promise;
};

const createDataBase = function (dataBasePath, defer) {
    let dataBasePath = dataBasePath || dataBasePathTest;
    let connectionPath = `${mongoPath}\\${dataBasePath}`;
    mongoose.createConnection(connectionPath).then(
        db => {
            console.log('Connection OK');
            dbConnection[dataBasePath] = db;
            defer.resolve(db);
        },
        err => {
            console.error(`Connection failed : ${err}`);
            defer.reject(err);
        }
    );
};

module.exports.getDataBase = getDataBase;