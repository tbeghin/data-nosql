const _ = require('underscore');
const Promise = require('es6-promise').Promise;
const crud = require('./Provider/crud');
const dataBaseManager = require('./Manager/dataBaseManager');
const modelManager = require('./Manager/modelManager');

let dataBase;

const init = function (collectionPath, dataBasePath) {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(collectionPath) || _.isEmpty(dataBasePath)) {
            reject('Missing data');
        }
        else {
            dataBaseManager.getDataBase(collectionPath, dataBasePath)
                .then(
                    db => {
                        dataBase = db;
                        modelManager.initModel(dataBase)
                            .then(
                                () => resolve(db),
                                err => reject(err)
                            )
                            .catch(
                                exception => reject(exception)
                            );
                    },
                    err => reject(err)
                );
        }
    });
};

module.exports.init = init;
module.exports.getAll = crud.getAll;
module.exports.get = crud.get;
module.exports.save = crud.save;
module.exports.update = crud.update;
module.exports.remove = crud.remove;