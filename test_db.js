//test_db.js

//Data Model
var bookDB = require('./models/bookDB.js');


//ADD BOOKS ///////////////////////////////////////////////

new bookDB({
    name: 'Ken Kesey',
    title: 'One Flew Over the Cuckoos Nest',
    pages: 320,
    digital: true
}).save();

new bookDB({
    name: 'J.K Rowling',
    title: 'Harry Potter and the Goblet of Fire',
    pages: 734,
    digital: true
}).save();

new bookDB({
    name: 'Neil Gaimen',
    title: 'American Gods',
    pages: 465,
    digital: true
}).save();

new bookDB({
    name: 'Jack Kerouac',
    title: 'The Dharma Bums',
    pages: 244,
    digital: false
}).save();

new bookDB({
    name: 'Donald Trump',
    title: 'The Art of the Deal',
    pages: 384,
    digital: false
}).save();

// FIND BOOKS
bookDB.find({}, function(err, books){
    if (err) console.log(err);
    
    //log all books
    console.log(books);
});