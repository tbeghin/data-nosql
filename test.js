/*eslint no-console: 0*/
const datanosql = require('./index.js');
const errorHandle = err => console.error(err);

datanosql.init('calligramme', 'mongodb://localhost:27017')
    .then(
        () => datanosql.save({name: 'treeview', mongoSchema: {test: 1}}, 'schemas'),
        errorHandle
    )
    .then(
        data => console.log(data),
        errorHandle
    )
    .catch(
        errorHandle
    );
