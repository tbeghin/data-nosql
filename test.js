/*eslint no-console: 0*/
const datanosql = require('./index.js');
const errorHandle = err => console.error(err);

datanosql.init('test', 'mongodb://localhost:27017')
    .then(
        () => {
            console.log('-----Resolve Init-----');
            datanosql.update(
                'schemas',
                {name: 'mytests'},
                {name: 'mytests', mongoSchema: {name: 'string', age: 'number'}}
            );
        },
        errorHandle
    )
    .then(
        () => datanosql.getAll('schemas'),
        errorHandle
    )
    .then(
        data => console.log(data),
        errorHandle
    )
    // .then(
    //     () => datanosql.save(
    //         'mytests',
    //         [
    //             {name: 'Test1', age: 1},
    //             {name: 'Test2', age: 2},
    //             {name: 'Test3', age: 3},
    //             {name: 'Test4', age: 8}
    //         ]),
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
    // .catch(
    //     errorHandle
    // );
