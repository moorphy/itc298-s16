module.exports = function(app){
 
   //NODE MODULE FOR LIBRARY
   var books = require('./lib/books.js');

   //TITLE TAG
    var pageTitle = 'MM ITC298 Library';
    
   ///////  G E T S  /////////////////////////////////////////////////
    
    //Homepage
    app.get('/', function (req, res){
        pageTitle = "MM ITC298 Library - Home";
        res.render('home', {
            book:books.getLibrary(),
            pageTitle}); 
    });
    
    //About Page
    app.get('/about', function (req, res){
        pageTitle = "Mike Murphy's ITC298 Library - About";
        res.render('about', {pageTitle});
    });
    
    //Add Book Page
    app.get('/add', function(req, res){
        pageTitle = "Add A Book To Murphy Library";
        //Variable created to check for Duplicates
       var bookMatch = books.getBook(req.params.title);
       if (!bookMatch) {
        bookMatch = {title: req.params.title};
    }
    res.render('add', {title: bookMatch} );    
    });
    
    //GET DETAILS
    app.get('/detail/:booktitle', function(req, res){
        res.type('text/html');
        var xBook = req.params.booktitle;
        var bookUP = req.params.booktitle.toUpperCase();
        var matchBook = books.getBook(xBook);
        pageTitle = "Murphy Library - " + bookUP;
        res.render('detail', {matchBook, pageTitle});
    });


    ///////////// P O S T S//////////////////////////////////////////////////

    //DETAIL PAGE
    app.post('/detail/:booktitle', function(req,res){
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
    app.post('/add', function(req,res){
        res.type('text/html');
        var newBook = {"title":req.body.title.toLowerCase(), "name":req.body.name, "pages":req.body.pages, "digital":req.body.digital};
        var result = books.addBook(newBook);
        res.render('detail', {book: newBook, result, pageTitle});
    
});

    //REMOVE BOOK
    app.post('/remove', function(req,res){
       res.type('text/html'); 
       var result = books.removeBook(req.body.title);
       res.render('detail', {result: result});
    });
 
 ///////////////////////  A  P  I  ///////////////////////////////////////////////////////////
app.get('/api/books', function(req, res){
    var bks= books.getLibrary();
    if(bks){
        res.json(bks);
    }else{
        res.status(500).send('A Database error occurred.');
    }
    
});

app.get('/api/book/:booktitle', function(req,res){
    var xTitle = req.params.booktitle.toLowerCase();
    var xBook = books.getBook(xTitle);
    if(xBook){
        res.json(xBook);
    }else{
        res.status(404).send("No matched item");
    }
});

 
 
 
 ///////////MIDDLEWARE////////////////////////////////////////


    // 404 Catch-All Handler
    app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});


    //500 Error Handler
    app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
 
 
    
}