const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    console.log('Connecting to MongoDB server');
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    /* Fetch data */
    db.collection('Todos').find({
        _id: new ObjectID('5b28fd98906762943fc1fa54')
    }).toArray().then((docs) => {
        console.log(`Todos`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    /* Print data amount */
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    /* Fetch data where name = "Corentin" */
    db.collection('Users').find({name: 'Corentin'}).toArray().then((docs) => {
       console.log(JSON.stringify(docs, undefined, 2));
    });


    //client.close();
});