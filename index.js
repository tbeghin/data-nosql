const q = require('q');
const getData = require('./getData');
const createDb = require('./createDataBase');
const model = require('./Schema/userSchema');
const dataBasePathDefault = 'mongodb://localhost/test';

let dataBase;

const init = function (dataBasePath) {
    createDb.createDataBase(dataBasePath || dataBasePathDefault).then(
        db => {
            dataBase = db;
            model.getModel(dataBase);
        },
        error => {
        }
    )
};

module.exports.init = init;
module.exports.getAll = getData.getAll;
module.exports.get = "";
module.exports.post = getData.save;
module.exports.update = "";
module.exports.delete = "";