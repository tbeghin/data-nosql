const datanosql = require('./index.js');

datanosql.init('calligramme', 'mongodb://localhost:27017').then(
    () => {
        setTimeout(
            () => {
                console.log('---> After init');
                datanosql.getAll('users');
            },
            3000
        );
    },
    err => console.error(err)
);