const q = require("q");
const modelList = require('./Schema/userSchema').modelList;

const getAll = function (dataBase, collection) {
    const defer = q.defer();
    let model = modelList[collection];
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

const save = function (dataBase, collection) {
    const defer = q.defer();
    let model = modelList[collection];
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
