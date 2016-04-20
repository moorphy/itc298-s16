//server.js

    var express = require('express');
    var xbars = require('express-handlebars');
    
    var server = express();
    server.engine('handlebars', xbars({defaultLayout:'main'}));
    server.set('view engine', 'handlebars');
    
    // POST http://localhost:8080/api/users
    // parameters sent with 
    server.get('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
    });
    
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

    //Library array for search
    var library = [     
    { name: 'shakespeare', book: 'Hamlet'},
    { name: 'bradbury', book: 'Martian Chronicals'},
    { name: 'martin', book: 'Game of Thrones' },
    { name: 'hesse', book: 'Steppenwolf' },
    { name: 'king', book: 'The Shining' },
    { name: 'hemingway' , book: 'The Old Man and The Sea'}
];

    //Posting the Search
    server.post('/search', function(req,res){
    res.type('html');
    var searching = '<h1>Searching for: ' + req.body.userinput + '</h1>';
    
    var searchResults = library.find(function( obj ) {
        return obj.name == req.body.userinput;
    });
    if (searchResults){

        res.send(searching + 'Book: ' + searchResults.book);

    } else {
        
        res.send(searching + 'No Books by that author. Sorry');
    }
    
});
    
    
    
    //Middleware
    
    //500 Error Handler
    server.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

    // 404 Catch-All Handler
    server.use(function(req, res, next){
    res.status(404);
    res.render('404');
});



