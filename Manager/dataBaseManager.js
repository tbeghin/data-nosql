const mongoose = require('mongoose');
mongoose.Promise = require('es6-promise').Promise;
const _ = require('underscore');
let dbConnection;

/**
 * Méthode retournant la base de données.
 * @param {string} collectionPath - Nom de la collection.
 * @param {string} dataBasePath - Chemin de la base de données.
 * @returns {Promise} La base de données.
 */
const getDataBase = function (collectionPath, dataBasePath) {
    return new Promise((resolve, reject) => {
        if (_.isUndefined(dbConnection)) {
            if (!_.isEmpty(collectionPath) && !_.isEmpty(dataBasePath)) {
                createDataBase(collectionPath, dataBasePath)
                    .then(
                        db => resolve(db),
                        err => reject(err)
                    )
                    .catch(
                        exception => reject(exception)
                    );
            }
            else {
                reject('La collection ou le chemin de base de données est vide.');
            }
        }
        else {
            resolve(dbConnection);
        }
    });
};

/**
 * @private
 * Méthode permettant de créer la base de données.
 * @param collectionPath {String} Nom de la collection.
 * @param dataBasePath {String} Chemin de la base de données.
 * @returns {Promise} La base de données.
 */
const createDataBase = function (collectionPath, dataBasePath) {
    return new Promise((resolve, reject) => {
        let connectionPath = `${dataBasePath}/${collectionPath}`;
        mongoose.createConnection(connectionPath, {useMongoClient: true})
            .then(
                db => {
                    dbConnection = db;
                    resolve(db);
                },
                err => {
                    reject(err);
                }
            )
            .catch(
                exception => reject(exception)
            );
    });
};

module.exports.getDataBase = getDataBase;