/*eslint no-console: 0*/
const datanosql = require('./index.js');

datanosql.init('calligramme', 'mongodb://localhost:27017')
    .then(
        () => datanosql.getAll('users'),
        err => console.error(err)
    )
    .then(
        data => console.log(data),
        err => console.error(err)
    )
    .catch(
        exception => console.error(exception)
    );