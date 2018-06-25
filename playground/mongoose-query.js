const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
// const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

/*
var id = '5b300435b63bec4ca61ff85d';
if(!ObjectID.isValid(id)){
    return console.log(('ID is not valid !'));
}

/!* Find all todo which's id === id *!/
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

/!* Find the todo which's id === id *!/
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('ID not found');
    }
    console.log('Todo by ID', todo);
}).catch((e) => console.log((e)));*/


var id = '5b2bc4b11f28127129058a41';

User.findById(id).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    console.log(`User's email : ${user.email}`)
}).catch((e) => console.log(e));


