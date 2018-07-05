var mongoose = require('mongoose');
var validator = require('validator');
/*{
    email: 'corentin@gmail.com',
    password: 'dzpédzepédzedezdze',
    tokens: [{
      access: 'auth',
      token: 'cepczépczêkezếkpdzedez'
    }]
}*/

/* The User model */
var User = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        /* Check if the email provided is an email correct address*/
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minglength: 6
    },
    token: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

module.exports = {User};