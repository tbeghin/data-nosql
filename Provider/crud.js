const Promise = require('es6-promise').Promise;
const modelManager = require('../Manager/modelManager');

const getAll = function (collection) {
    console.log('getAll : ' + collection);
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => {
                    model.find()
                        .then(
                            docs => {
                                console.log('Show data ' + collection + ' :');
                                console.log(docs);
                                resolve(docs);
                            },
                            err => reject(err))
                        .catch(
                            exception => reject(exception)
                        );
                },
                err => reject(err))
            .catch(
                exception => reject(exception)
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
