require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 3000;

/* Define the page renderer to Body Parser */
app.use(bodyParser.json());

/* Create a new todo from request's text */
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

/* Home */
app.get('/', (req, res) => {

    var information = {
        port,
        environment: process.env.NODE_ENV,
        current_commit: "undefined",
        mongo_hostname: mongoose.connection.host,
        mongo_database: mongoose.connection.db.name
    }

    if (process.env.MONGODB_ADDON_DB) {
        information.mongo_database = process.env.MONGODB_ADDON_DB;
    } else if (!mongoose.connection.db.name) {
        information.mongo_database = "undefined";
    }

    if (process.env.COMMIT_ID) {
        information.current_commit = process.env.COMMIT_ID;
    }

    res.send(JSON.stringify({
        information
    }));
});

/* Return every user's todos */
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

/* GET /todos/1234 */
app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        //return res.status(404).send();
        return res.send(JSON.stringify({
            code: 404,
            error: 'Incorrect ID'
        }));
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
        }).then((todo) => {
        if (!todo) {
            return res.send(JSON.stringify({
                code: 404,
                error: 'ID not found'
            }));
        }
        return res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    // get the id
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();

    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();

        }
        return res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

/* Update a Todo */
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    /* Get args*/
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    /* Check args*/
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();

        }

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});


// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        //  Return header from the generated auth token
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        // Called if email isn't unique
        res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});



// GET /users
app.get('/users', (req, res) => {
    User.findByEmail('malo.grall@gmail.com', (err, user) => {
        if(err){
            console.log(err);
        } else{
            console.log(user.email);
        }
    })

    User.find().then((user) => {
        res.send({
            user
        });
    }, (e) => {
        res.status(400).send(e);
    })
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });

});

// DELETE /users/me/token for log out users
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});


/* Run Express on port 3000 */
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});

/* Export the Express application*/
module.exports = {app};