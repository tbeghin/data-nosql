const datanosql = require('./index.js');

datanosql.init('calligramme', 'mongodb://localhost:27017').then(
    () => {
        datanosql.getAll('users');
    },
    err => console.error(err)
);