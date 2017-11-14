const Promise = require('es6-promise').Promise;
const modelManager = require('../Manager/modelManager');
const dataBaseManager = require('../Manager/dataBaseManager');
const _ = require('underscore');

const getAll = (collection) => {
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

const get = (collection, query) => {
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

const save = (collection, data) => {
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
                docs => {
                    resolve(docs);
                    if (collection === 'schemas') {
                        dataBaseManager.getDataBase()
                            .then(
                                db => modelManager.initModel(db)
                            );
                    }
                },
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

const update = (collection, data, query) => {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => model.updateMany(query, {$set: data}),
                err => reject(err)
            )
            .then(
                docs => {
                    resolve(docs);
                    if (collection === 'schemas') {
                        dataBaseManager.getDataBase()
                            .then(
                                db => modelManager.initModel(db)
                            );
                    }
                },
                err => reject(err)
            )
            .catch(
                exception => reject(exception)
            );
    });
};

const remove = (collection, data) => {
    return new Promise((resolve, reject) => {
        modelManager.getModel(collection)
            .then(
                model => model.remove(data),
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

const preCrud = (collection, query, data, crudFunction) => {
    if (!_.isFunction(crudFunction)) {
        crudFunction = data;
        data = query;
        query = {};
    }

    return new Promise((resolve, reject) => {
        if (!_.isArray(data)) {
            data = [data];
        }
        let promises = [];
        _.forEach(data, item => {
            promises.push(crudFunction(collection, item, query));
        });
        Promise.all(promises).then(
            () => resolve(data),
            err => reject(err)
        );
    });
};

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.save = save;
module.exports.update = update;
module.exports.remove = remove;
module.exports.preCrud = preCrud;
