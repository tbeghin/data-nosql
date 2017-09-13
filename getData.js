const q = require('q');
const modelManager = require('./Manager/modelManager');

const getAll = function (collection) {
    const defer = q.defer();
    let model = modelManager.getModel(collection);
    model.find(
        (err, docs) => {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(docs);
            }
        }
    );
    return defer.promise;
};

const save = function (data, collection) {
    const defer = q.defer();
    let model = modelManager.getModel(collection);
    model.save(
        (err) => {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve('save ok');
            }
        }
    );
    return defer.promise;
};

module.exports.getAll = getAll;
module.exports.save = save;
