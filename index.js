//index.js

    var express = require('express');
    var server = express();
    var books = require('./lib/books.js');
 
    // CONFIGURE EXPRESS APP
    server.set('port', process.env.PORT || 3000);//SET PORT
    server.use(express.static(__dirname + '/public'));//CSS & IMG  
    server.use(require('body-parser').urlencoded({extended:true})); //support encoded bodies
    
     //Title Tag
    var pageTitle = 'MM ITC298 Library';

    //TEMPLATE ENGINE
    var viewsPath = __dirname + '/views'; 
    var handlebars = require('express-handlebars').create({
        defaultLayout:'main', 
        extname: '.hbs',
        layoutsDir: viewsPath + '/layouts',  
        partialsDir: viewsPath + '/partials' });
    server.engine('hbs', handlebars.engine);
    server.set('views', viewsPath);
    server.set('view engine', 'hbs');


    //Variable that updates copyright year
    //var year = getFullYear();
    
    ///////  G E T S  /////////////////////////////////////////////////
    
    //Homepage
    server.get('/', function (req, res){
        pageTitle = "MM ITC298 Library - Home";
        res.render('home', {
            book:books.getLibrary(),
            pageTitle}); 
    });
    
    //About Page
    server.get('/about', function (req, res){
        pageTitle = "Mike Murphy's ITC298 Library - About";
        res.render('about', {pageTitle});
    });
    
    //Add Book Page
    server.get('/add', function(req, res){
        pageTitle = "Add A Book To Murphy Library";
        //Variable created to check for Duplicates
       var bookMatch = books.getBook(req.params.title);
       if (!bookMatch) {
        bookMatch = {title: req.params.title};
    }
    res.render('add', {title: bookMatch} );    
    });
    
    //GET DETAILS
    server.get('/detail/:booktitle', function(req, res){
        res.type('text/html');
        var xBook = req.params.booktitle;
        var bookUP = req.params.booktitle.toUpperCase();
        var matchBook = books.getBook(xBook);
        pageTitle = "Murphy Library - " + bookUP;
        res.render('detail', {matchBook, pageTitle});
    });


    ///////////// P O S T S//////////////////////////////////////////////////

    //DETAIL PAGE
    server.post('/detail/:booktitle', function(req,res){
    res.type('text/html');
    //FOUND BOOK MUST COMPARE TITLES
    var foundBook = books.getBook(req.body.bookTitle);
    //IF BOOK IS NOT FOUND
    if (!foundBook){
        foundBook = {title: req.body.title};
    }
    res.render('detail', {books:foundBook});
});

    //ADD A BOOK
    server.post('/add', function(req,res){
        res.type('text/html');
        var newBook = {"title":req.body.title.toLowerCase(), "name":req.body.name, "pages":req.body.pages, "digital":req.body.digital};
        var result = books.addBook(newBook);
        res.render('add', {book: newBook, result, pageTitle});
    
});

    //REMOVE BOOK
    server.post('/remove', function(req,res){
       res.type('text/html'); 
       var result = books.removeBook(req.body.title);
       res.render('detail', {result: result});
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

    //START SERVER
    server.listen(server.get('port'), function(){
    console.log('The Server is Up. CTL+C to Terminate')
});

