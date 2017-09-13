const q = require('q');
const getData = require('./getData');
const dataBaseManager = require('./Manager/dataBaseManager');
const modelManager = require('./Manager/modelManager');

let dataBase;

const init = function (dataBasePath, mongoPath) {
    const defer = q.defer();
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
module.exports.getAll = getData.getAll;
module.exports.get = '';
module.exports.post = getData.save;
module.exports.update = '';
module.exports.delete = '';