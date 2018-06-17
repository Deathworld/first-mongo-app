const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    console.log('Connecting to MongoDB server');
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // Insert new doc into Users (name, age, location)

    const db = client.db('Users');
    db.collection('Users').insertOne({
        name: 'Corentin',
        age: 17,
        location: 'France'

    }, (err, result) => {
        if(err){
            return console.log('Unable to register User', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });


    client.close();
});