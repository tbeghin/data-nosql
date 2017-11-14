/*eslint no-console: 0*/
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.createConnection('mongodb://localhost/testMongoose', {useMongoClient: true}).then(
    db => {
        let kittySchema = mongoose.Schema({
            name: String,
            age: Number,
            description: String,
            isToto: Boolean,
            test: String
        });
        let Kitten = db.model('Kitten', kittySchema);

        let fluffy = new Kitten({name: 'fluffy', age: 20});
        // fluffy.save(fluffy).then(
        //     fluffy => console.log(fluffy.name),
        //     err => console.error(err)
        // ).catch(
        //     exception => console.error(exception)
        // );


        Kitten.updateMany({name: 'fluffy'}, {$set: {age: 25, description: "Yolo", isToto: true}}).then(
            fluffy => console.log(fluffy.name),
            err => console.error(err)
        ).catch(
            exception => console.error(exception)
        );

        // fluffy.update({name: 'fluffy'}).then(
        //     fluffy => console.log(fluffy.name),
        //     err => console.error(err)
        // ).catch(
        //     exception => console.error(exception)
        // );
    },
    err => {
        console.error(err);
    }
).catch(
    exception => console.error(exception)
);