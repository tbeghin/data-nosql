// Inclusion de Mongoose
const mongoose = require('mongoose');
const q = require('q');
let dbConnection;

const createDataBase = function (dataBasePath) {
    let defer = q.defer();
    if (dbConnection) {
        defer.resolve(dbConnection);
    }
    else {
        mongoose.createConnection(dataBasePath).then(
            db => {
                console.log('Connection OK');
                dbConnection = db;
                defer.resolve(dbConnection);
            },
            err => console.error(`Connection failed : ${err}`)
        );
    }

    return defer.promise;
};

module.exports.createDataBase = createDataBase;