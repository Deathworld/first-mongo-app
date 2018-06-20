const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    console.log('Connecting to MongoDB server');
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    /* Change 'Corentin' to 'God' without returning anything */
    db.collection('Users').findOneAndUpdate({
        name: 'Corentin'
    }, {
        $set: {
            name: 'God'
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    });


    /* Increments Malo's age */
    db.collection('Users').findOneAndUpdate({
        name: 'Malo'
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    });



    //client.close();
});