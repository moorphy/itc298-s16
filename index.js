//server.js

    var express = require('express');
    var xbars = require('express-handlebars');
    
    var server = express();
    var books = require('./lib/books.js');
    
    server.engine('handlebars', xbars({defaultLayout:'main'}));
    server.set('view engine', 'handlebars');
    
    // POST http://localhost:8080/api/users
    // parameters sent with 
    //server.get('/api/users', function(req, res) {
    //var user_id = req.body.id;
    //var token = req.body.token;
    //var geo = req.body.geo;

    //res.send(user_id + ' ' + token + ' ' + geo);
    //});
    
    var bodyParser = require('body-parser');
    server.use(bodyParser.json()); //support json encoded bodies
    server.use(bodyParser.urlencoded({ extended:true})); //support encoded bodies
    
    server.get('/', function (req, res){
    res.render('home'); 
    });
    server.get('/about', function (req, res){
        res.render('about');
    });
    server.listen(process.env.PORT || 3000);
    server.listen(server.get('port'), function(){
    console.log('The Server is Up')
});


    //Posting the Search
    server.post('/search', function(req,res){
    res.type('html');
    var searching = '<h3>Searching for: ' + req.body.userinput + '</h3>';
    var searchResults = req.body.userinput;
    if (books.searchArray(searchResults)){

        res.send(searching + 'Book: ' + books.searchArray(searchResults).title + '<br> By: ' + books.searchArray(searchResults).name 
        + '<br>' +  books.searchArray(searchResults).pages  + ' pages');

    } else {
        
        res.send(searching + 'No Books by that name. Sorry');
    }
    
});

    //REMOVE A BOOK
    server.post('/remove', function(req,res){
        res.type('html');
        var checkOut = '<h3>Checking out: ' + req.body.checkOut + '</h3>';
        var deleteBook = req.body.checkOut;
        books.removeBook(deleteBook);
        res.send(checkOut + deleteBook + ' has been removed!');
});

    //ADD A BOOK
    server.post('/add', function(req,res){
        res.type('html');
        var addingBook = '<h3>Adding ' + req.body.addTitle + ' by ' + req.body.addAuthor +' '+ req.body.addPages  +  '  pages in length </h3>';
        var newBook = [{name: req.body.addAuthor, title: req.body.addTitle, pages: req.body.addPages}];
        
        //Add to Object in Books.js
        books.addBook(newBook);
        //SEND RESPONSE TO CLIENT
        res.send(addingBook + ' " ' + req.body.addTitle + ' " '+ 'By: '+ req.body.addAuthor + ' has been added.');
    
});

    //UPDATE BOOK INFORMATION
    server.post('/update', function(req,res){
       res.type('html');
       var updateMsg = '<h3> Changing the info for ' + req.body.oldBook + '</h3>'; 
       var newInfo = [{name: req.body.updateAddAuthor, title: req.body.updateAddTitle, pages: req.body.updateAddPages}];
       books.updateInfo(req.body.oldBook, newInfo);
       
       //IF A BOOK IS FOUND IT IS UPDATED
       if (books.updateInfo() === 1){
           //Send a msg saying it was updated
           res.send(updateMsg + ' to ' + req.body.updateAddAuthor);
       }
       //IF IT WAS NOT UPDATED
       else{
           res.send('Nothing was updated');
       }
        
    });

    
    //Middleware

    // 404 Catch-All Handler
    server.use(function(req, res, next){
    res.status(404);
    res.render('404');
});


    //500 Error Handler
    server.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

