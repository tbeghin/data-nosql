const Promise = require('es6-promise').Promise;
const modelManager = require('../Manager/modelManager');

const getAll = function (collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => model.find(),
                err => reject(err))
            .then(
                docs => resolve(docs),
                err => reject(err))
            .catch(
                exception => reject(exception)
            );
    });
};

const get = function (collection, query) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => model.find(query),
                err => reject(err)
            )
            .then(
                docs => resolve(docs),
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

const save = function (data, collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => {
                    let saveData = new model(data);
                    saveData.save();
                },
                err => reject(err)
            )
            .then(
                docs => resolve(docs),
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

const update = function (collection, data) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => {
                    model(data);
                    model.update();
                },
                err => reject(err)
            )
            .then(
                docs => resolve(docs),
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

const remove = function (collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => model.remove(),
                err => reject(err)
            )
            .then(
                docs => resolve(docs),
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.save = save;
module.exports.update = update;
module.exports.remove = remove;
