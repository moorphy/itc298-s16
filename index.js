//server.js

    var express = require('express');
    var xbars = require('express-handlebars');
<<<<<<< HEAD
    var server = express();
    var books = require('./lib/books.js');
    
    
    server.engine('hbs', xbars({defaultLayout:'main', extname: '.hbs'}));
    server.set('view engine', 'hbs');
    
    //LOCALHOST 3000
    server.set('port',process.env.PORT || 3000);
    server.listen(server.get('port'), function(){
    console.log('The Server is Up. CTL + C to terminate')
});

=======
    
    var server = express();
    var books = require('./lib/books.js');
    
    server.engine('handlebars', xbars({defaultLayout:'main'}));
    server.set('view engine', 'handlebars');
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
    
    // POST http://localhost:8080/api/users
    // parameters sent with 
    //server.get('/api/users', function(req, res) {
    //var user_id = req.body.id;
    //var token = req.body.token;
    //var geo = req.body.geo;

    //res.send(user_id + ' ' + token + ' ' + geo);
    //});
    
<<<<<<< HEAD
    //BODY PARSER
    //body-parser extracts the entire body portion of an incoming 
    //request stream and exposes it on req.body as something easier 
    //to interface with
    var bodyParser = require('body-parser');
    server.use(bodyParser.json());
    //support encoded bodies
    server.use(bodyParser.urlencoded({ extended:true})); 
    
    //CSS IMAGES JS FILES ROUTE TO PUBLIC FOLDER
    server.use(express.static('public'));
=======
    var bodyParser = require('body-parser');
    server.use(bodyParser.json()); //support json encoded bodies
    server.use(bodyParser.urlencoded({ extended:true})); //support encoded bodies
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
    
    server.get('/', function (req, res){
    res.render('home'); 
    });
    server.get('/about', function (req, res){
<<<<<<< HEAD
    res.render('about');
    });

    //Variable that updates copyright year
    //var year = getFullYear();
=======
        res.render('about');
    });
    server.listen(process.env.PORT || 3000);
    server.listen(server.get('port'), function(){
    console.log('The Server is Up')
});
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545


    //Posting the Search
    server.post('/search', function(req,res){
    res.type('html');
    var searching = '<h3>Searching for: ' + req.body.userinput + '</h3>';
    var searchResults = req.body.userinput;
    if (books.searchArray(searchResults)){


        res.send(searching + 'Book: ' + books.searchArray(searchResults).title + '<br> By: ' + books.searchArray(searchResults).name 
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
        + '<br>' +  books.searchArray(searchResults).pages  + ' pages');

    } else {
        

=======
        res.send(searching + 'No Books by that name. Sorry');
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
    }
    
});

    //REMOVE A BOOK
    server.post('/remove', function(req,res){
        res.type('html');
        var checkOut = '<h3>Checking out: ' + req.body.checkOut + '</h3>';
        var deleteBook = req.body.checkOut;
        books.removeBook(deleteBook);
<<<<<<< HEAD
        res.render(checkOut + deleteBook + ' has been removed!');
=======
        res.send(checkOut + deleteBook + ' has been removed!');
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
});

    //ADD A BOOK
    server.post('/add', function(req,res){
        res.type('html');
        var addingBook = '<h3>Adding ' + req.body.addTitle + ' by ' + req.body.addAuthor +' '+ req.body.addPages  +  '  pages in length </h3>';
        var newBook = [{name: req.body.addAuthor, title: req.body.addTitle, pages: req.body.addPages}];
        
        //Add to Object in Books.js
        books.addBook(newBook);
        //SEND RESPONSE TO CLIENT
<<<<<<< HEAD
        res.render(addingBook + ' " ' + req.body.addTitle + ' " '+ 'By: '+ req.body.addAuthor + ' has been added.');
=======
        res.send(addingBook + ' " ' + req.body.addTitle + ' " '+ 'By: '+ req.body.addAuthor + ' has been added.');
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
    
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
<<<<<<< HEAD
           res.render(updateMsg + ' to ' + req.body.updateAddAuthor);
       }
       //IF IT WAS NOT UPDATED
       else{
           res.render('Nothing was updated');
=======
           res.send(updateMsg + ' to ' + req.body.updateAddAuthor);
       }
       //IF IT WAS NOT UPDATED
       else{
           res.send('Nothing was updated');
>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
       }
        
    });

    
    //Middleware
<<<<<<< HEAD
    
=======

>>>>>>> c2e36a4add5a893071814b02af4a3ef71de13545
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

