var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


/*var Todo = mongoose.model('Todo', {
   text: {
       type: String,
       minlength: 3,
       trim: true
   } ,
    completed: {
        type: Boolean,
        default: false
    },
    completedAt :{
       type: Number,
        default: null
    }
});*/

var User = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
});

var newUser = new User({
   email: 'corentin.grall@gmail.com'
});

newUser.save().then((doc) =>{
    console.log('User successfully registered !', doc);
}, (e) => {
    console.log('Unable to register User !', e);
});
