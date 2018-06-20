const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    console.log('Connecting to MongoDB server');
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

   /* Delete many */
    db.collection('Todos').deleteMany({text: 'Go to KTH'}).then((result) => {
      console.log(result);
   });

    /* Delete One */
   db.collection('Todos').deleteOne({text: 'Go to KTH'}).then((result) => {
       console.log(result);
    });

    /* Fine one and delete */

    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
       console.log(result);
    });


    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b2a31774cfdd476af3a0053')}).then((result) => {
       console.log(result);
    });


    //client.close();
});