const Promise = require('es6-promise').Promise;
const modelManager = require('../Manager/modelManager');

const getAll = function (collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection).then(
            model => model.find(
                (err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(docs);
                    }
                }),
            err => reject(err)
        );
    });
};

const get = function (collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection).then(
            model => model.find(
                (err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(docs);
                    }
                }
            ),
            err => reject(err)
        );
    });
};

const save = function (data, collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection).then(
            model => {
                model(data);
                model.save(
                    (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve('save ok');
                        }
                    },
                    err => reject(err)
                );
            });
    });
};

const update = function (collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection).then(
            model => model.update(
                (err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(docs);
                    }
                }
            ),
            err => reject(err)
        );
    });
};

const remove = function (collection) {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection).then(
            model => model.find(
                (err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(docs);
                    }
                }
            ),
            err => reject(err)
        );
    });
};

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.save = save;
module.exports.update = update;
module.exports.remove = remove;
