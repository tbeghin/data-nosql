const q = require('q');
const getData = require('./getData');
const dataBaseManager = require('./Manager/dataBaseManager');
const modelManager = require('./Manager/modelManager');

let dataBase;

const init = function (dataBasePath) {
    const defer = q.defer();
    dataBaseManager.getDataBase(dataBasePath).then(
        db => {
            dataBase = db;
            modelManager.initModel(dataBase);
            defer.resolve(db);
        },
        error => {
            defer.reject(error);
        }
    );
    return defer.promise;
};

function getConfigDataBase() {

}

module.exports.init = init;
module.exports.getAll = getData.getAll;
module.exports.get = "";
module.exports.post = getData.save;
module.exports.update = "";
module.exports.delete = "";