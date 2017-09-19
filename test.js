const datanosql = require('./index.js');

datanosql.init('calligramme', 'mongodb://localhost:27017').then(
    () => {
        console.log('After init');
        datanosql.getAll('users');
    },
    err => console.error(err)
);

// const mongoose = require('mongoose');
// mongoose.Promise = Promise;
//
// mongoose.createConnection('mongodb://localhost/test', {useMongoClient: true}).then(
//     db => {
//         let kittySchema = mongoose.Schema({
//             name: String
//         });
//         let Kitten = db.model('Kitten', kittySchema);
//         let silence = new Kitten({name: 'Silence'});
//         console.log(silence.name);
//         let fluffy = new Kitten({name: 'fluffy'});
//         fluffy.save().then(
//             fluffy => console.log(fluffy.name),
//             err => console.error(err)
//         ).catch(
//             exception => console.error(exception)
//         );
//     },
//     err => {
//         console.error(err);
//     }
// ).catch(
//     exception => console.error(exception)
// );