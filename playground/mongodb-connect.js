/* Create variables MongoClient and ObjectID, coming from mongodb package*/
const {MongoClient, ObjectID} = require('mongodb');


/* Connect to UsersList Database*/
MongoClient.connect('mongodb://localhost:27017/UsersList', (err, client) => {
    console.log('Connecting to MongoDB server');
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');


    /* Select the Database */
    const db = client.db('TodoApp');

    /* Insert something into it*/
    db.collection('Users').insertOne({
        name: 'Corentin',
        age: 17,
        location: 'France'

    }, (err, result) => {
        if(err){
            return console.log('Unable to register User', err);
        }
    });


    client.close();
});