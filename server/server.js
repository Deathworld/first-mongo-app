var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

/* Define the page renderer to Body Parser */
app.use(bodyParser.json());

/* Create a new todo from request's text */
app.post('/todos', (req, res) => {
    var todo = new Todo({
       text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


/* Run Express on port 3000 */
app.listen(3000, () => {
    console.log('Express server started on port 3000');
});

/* Export the Express application*/
module.exports = {app};