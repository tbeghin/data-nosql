const Promise = require('es6-promise').Promise;
const modelManager = require('../Manager/modelManager');

const getAll = function (collection) {
    return new Promise((resolve, reject) => {
        let model = modelManager.getModel(collection);
        model.find(
            (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            }
        );
    });
};

const get = function (collection) {
    return new Promise((resolve, reject) => {
        let model = modelManager.getModel(collection);
        model.find(
            (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            }
        );
    });
};

const save = function (data, collection) {
    return new Promise((resolve, reject) => {
        let model = modelManager.getModel(collection);
        model(data);
        model.save(
            (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('save ok');
                }
            }
        );
    });
};

const update = function (collection) {
    return new Promise((resolve, reject) => {
        let model = modelManager.getModel(collection);
        model.update(
            (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            }
        );
    });
};

const remove = function (collection) {
    return new Promise((resolve, reject) => {
        let model = modelManager.getModel(collection);
        model.find(
            (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            }
        );
    });
};

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.save = save;
module.exports.update = update;
module.exports.remove = remove;
