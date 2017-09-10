// Inclusion de Mongoose
const mongoose = require('mongoose');
const q = require('q');
let dbConnection;

const createDataBase = function () {
    let defer = q.defer();
    if (dbConnection) {
        defer.resolve(dbConnection);
    }
    else {
        // On se connecte à la base de données
        // N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
        mongoose.createConnection('mongodb://localhost/blog').then(
            db => {
                console.log("Connection OK");
                dbConnection = db;
                defer.resolve(dbConnection);
            },
            err => console.error(`Connection failed : ${err}`)
        );
    }

    return defer.promise;
};

module.exports = {
    createDataBase: createDataBase
};