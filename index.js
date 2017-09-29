const _ = require('underscore');
const Promise = require('es6-promise').Promise;
const crud = require('./Provider/crud');
const dataBaseManager = require('./Manager/dataBaseManager');
const modelManager = require('./Manager/modelManager');

let dataBase;

/**
 * Méthode de création de la base de donnée.
 * @param collectionPath Nom de la collection.
 * @param dataBasePath Path de la collection.
 * @example ('test", 'mongodb://localhost:27017')
 * @returns {Promise<any>} Renvoi la base de donnée.
 */
const init = function (collectionPath, dataBasePath) {
    console.log('-----Init-----');
    return new Promise((resolve, reject) => {
        if (_.isEmpty(collectionPath) || _.isEmpty(dataBasePath)) {
            reject('Paramètre manquant');
        }
        else {
            console.log('-----dataBaseManager.getDataBase-----');
            dataBaseManager.getDataBase(collectionPath, dataBasePath)
                .then(
                    db => {
                        console.log('-----Resolve dataBaseManager.getDataBase-----');
                        dataBase = db;
                        console.log('-----modelManager.initModel-----');
                        modelManager.initModel(dataBase);
                    },
                    err => reject(err)
                )
                .then(
                    () => {
                        console.log('-----Resolve modelManager.initModel-----');
                        resolve(dataBase);
                    },
                    err => reject(err)
                )
                .catch(
                    exception => reject(exception)
                );
        }
    });
};

module.exports.init = init;
module.exports.getAll = (collection) => crud.getAll(collection);
module.exports.get = (collection, query) => crud.get(collection, query);
module.exports.save = (collection, data) => crud.preCrud(collection, data, crud.save);
module.exports.update = (collection, query, data) => crud.preCrud(collection, query, data, crud.update);
module.exports.remove = (collection, data) => crud.preCrud(collection, data, crud.remove);