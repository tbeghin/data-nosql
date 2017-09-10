// Inclusion de Mongoose
const mongoose = require('mongoose');
const getData = require('./getData');
const createDb = require('./createDataBase');
let db = createDb.createDataBase().then(
    x => {},
    error => {}
);

module.exports({
    getAll: getData.getAll(db),
    get: "",
    post:"",
    update:"",
    delete:""
});