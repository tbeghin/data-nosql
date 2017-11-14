/*eslint no-console: 0*/
const datanosql = require('./index.js');
const errorHandle = (err, message) => console.error(`${message}\r\n Error : ${err}`);

datanosql.init('test', 'mongodb://localhost:27017')
    .then(
        () => {
            console.log('-----Resolve Init-----');
            return datanosql.get(
                'schemas',
                {name: 'mytests'}
            );
        },
        err => errorHandle(err, 'Save Schema')
    )
    .then(
        data => {
            console.log('-----Resolve Get-----');
            if (!data || data.length === 0) {
                console.log('-No Data-');
                return datanosql.save(
                    'schemas',
                    {name: 'mytests', mongoSchema: {age: 'number'}}
                );
            } else {
                console.log(data);
                return datanosql.update(
                    'schemas',
                    {name: 'mytests'},
                    {name: 'mytests', mongoSchema: {name: 'string', age: 'number'}}
                );
            }
        },
        err => errorHandle(err, 'Init')
    )
    .then(
        data => {
            console.log('-----Resolve Save/Update Schema-----');
            console.log(data);
            return datanosql.getAll('schemas');
        },
        err => errorHandle(err, 'Update')
    )
    .then(
        data => {
            console.log('-----Resolve GetAll Schema-----');
            console.log(data);
        },
        err => errorHandle(err, 'GetAll')
    )
    .then(
        () => {
            console.log('-----Resolve Console-----');
            return datanosql.save(
                'mytests',
                [
                    {name: 'Test1', age: 1},
                    {name: 'Test2', age: 2},
                    {name: 'Test3', age: 3},
                    {name: 'Test4', age: 8}
                ]);
        },
        err => errorHandle(err, 'Console')
    )
    .then(
        data => {
            console.log('-----Resolve Save test-----');
            console.log(data);
        },
        err => errorHandle(err, 'Save test')
    )
    // .then(
    //     data => console.log(data),
    //     errorHandle
    // )
    // .then(
    //     () => datanosql.update('mytests', {name: 'Test4'}, {age: 4}),
    //     errorHandle
    // )
    // .then(
    //     () => datanosql.get('mytests', {name: 'Test4'}),
    //     errorHandle
    // )
    // .then(
    //     data => console.log(data),
    //     errorHandle
    // )
    // .then(
    //     () => datanosql.remove('mytests', [{name: 'Test2'}, {name: 'Test3'}]),
    //     errorHandle
    // )
    // .then(
    //     () => datanosql.getAll('mytests'),
    //     errorHandle
    // )
    // .then(
    //     data => console.log(data),
    //     errorHandle
    // )
    .catch(
        err => errorHandle(err, 'Catch')
    );
