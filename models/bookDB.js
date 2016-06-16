//bookDB,js

var mongoose = require('mongoose');
var credentials = require('../lib/credentials.js');


//DATABASE CONNECT //////////////////////////////////
mongoose.connect(credentials.mongo.development.connectionString);
/////////////////////////////////////////////////////

var dbConnect = mongoose.connection; 
dbConnect.on('error', 
console.error.bind(console, 'Connection Error:')); 

//DATABASE SCHEMA
var bookSchema = mongoose.Schema({
   name: String,
   title: String,
   pages: Number,
   digital: Boolean,
});
var Book =  mongoose.model('Book', bookSchema);

//EXPORT MODEL TO APPLICATION
module.exports = Book;
