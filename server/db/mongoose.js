var mongoose = require('mongoose');


/* Connect to TodoApp Database*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};