// Inclusion de Mongoose
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
            module.exports({
                getAll: getData.getAll(dataBase, "collection"),
                get: "",
                post: getData.save(dataBase, "collection"),
                update: "",
                delete: ""
            });
        },
        error => {
        }
    );
};

module.exports({
    'init': init
});