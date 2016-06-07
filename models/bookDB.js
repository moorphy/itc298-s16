//bookDB,js

var mongoose = require('mongoose');
var credentials = require('../credentials.js');
var options = {
    server: {
        socketOptions:{ 
            keepAlive:1,
            connectTimeoutMS: 30000
        }
    }
};


//DATABASE CONNECT //////////////////////////////////
mongoose.connect(credentials.mongo.connectionString, options);
/////////////////////////////////////////////////////

//DATABASE SCHEMA
var Schema = mongoose.Schema;

var bookSchema = new Schema({
   name: String,
   title: String,
   pages: Number,
   digital: Boolean
});

var bookModel = mongoose.model('bookDB', bookSchema);

//EXPORT MODEL TO APPLICATION
module.exports = bookModel;