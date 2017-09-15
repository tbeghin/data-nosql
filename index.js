const q = require('q');
const _ = require('underscore');
const crud = require('./Provider/crud');
const dataBaseManager = require('./Manager/dataBaseManager');
const modelManager = require('./Manager/modelManager');

let dataBase;

const init = function (dataBasePath, mongoPath) {
    const defer = q.defer();
    if (_.isEmpty(dataBasePath) || _.isEmpty(mongoPath)) {
        defer.reject('Missing data');
    }
    dataBaseManager.getDataBase(dataBasePath, mongoPath).then(
        db => {
            dataBase = db;
            modelManager.initModel(dataBase);
            defer.resolve(db);
        },
        err => defer.reject(err)
    );
    return defer.promise;
};

module.exports.init = init;
module.exports.getAll = crud.getAll;
module.exports.get = '';
module.exports.save = crud.save;
module.exports.update = '';
module.exports.remove = '';