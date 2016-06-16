module.exports = function(app){
 
   //NODE MODULE FOR LIBRARY
   var Book = require('./models/bookDB');

   //TITLE TAG
    var pageTitle = 'MM ITC298 Library';
    
   ///////  G E T S  /////////////////////////////////////////////////
    
    //Homepage
    app.get('/', function(req, res){
        Book.find(function(err, books){
            if (err) console.error(err);
            if (!books) return next();
            res.type('text/html');
            res.render('home', {books: books});
        });
    });
    
    //About Page
    app.get('/about', function (req, res){
        res.type('text/html');
        pageTitle = "Mike Murphy's ITC298 Library - About";
        res.render('about', {pageTitle});
    });
    
    //Add Book Page
    app.get('/add', function(req, res){
        pageTitle = "Add A Book To Murphy Library";
        res.render('add', {pageTitle} );    
    });
    
    //GET DETAILS
    app.get('/detail/:title', function(req, res){
        var title = req.params.title;
        var bookUP = req.params.title.toUpperCase();
        Book.findOne({"title": title}, function (err, matchBook){
            if (err) return next(err);
            if (!matchBook) {
                matchBook = {title : title};
            }
        });
        pageTitle = "Murphy Library - " + bookUP;
        res.type('text/html');
        res.render('detail', {matchBook, pageTitle});
    });


    ///////////// P O S T S//////////////////////////////////////////////////

    //S E A R C H
    app.post('/search', function(req, res) {
       var title = req.params.title;
       Book.findOne({'title' : title}, function (err, matchBook){
           if(err) return next(err);
           if(!matchBook){
               //If there is no corresponding title, add Title from Req
               matchBook = {'title':title};
           }
           res.type('text/html');
           res.render('detail', {title: matchBook});
       });
    });

    //DETAIL PAGE
    app.post('/detail/:title', function(req,res){
    //FOUND BOOK MUST COMPARE TITLES
    var foundBook = Book.findOne(req.body.title);
    //IF BOOK IS NOT FOUND
    if (!foundBook){
        foundBook = {title: req.body.title};
    }
    res.type('text/html');
    res.render('detail', {book: foundBook});
});

    //ADD A BOOK
    app.post('/add', function(req,res){
        res.type('text/html');
        var newBook = {"title":req.body.title.toLowerCase(), "name":req.body.name, "pages":req.body.pages, "digital":req.body.digital};
        var bookID = (req.body.id) ? req.body.id : "";
        Book.update({"id":bookID}, newBook, function(err, x){
            var action = (x) ? "updated": "added";
            res.render('detail', {book: newBook,pageTitle, result:{action:action}});
        });
});

    //REMOVE BOOK
    app.post('/remove', function(req,res){
        //Log the book being deleted
        console.log(req.body.id);
        Book.remove({"_id":req.body.id}, function(err){
            //log the error
            console.log(err);
            var action = (err) ? err: "deleted";
            res.type('text/html'); 
            res.render('detail', {result: action});
        });
    });
    
    
 
 ///////////////////////  A  P  I  ///////////////////////////////////////////////////////////
 
 
app.get('/api/books', function(req, res){
    Book.find(function (err, books){
       if (err) return next(err);
       if(books) {
           res.json(books);
       }else{
           res.status(404).send('404 - Info Not Found');
       }
    });
    //OLD LOGIC
    // var bks= Book.getLibrary();
    // if(bks){
    //     res.json(bks);
    // }else{
    //     res.status(500).send('A Database error occurred.');
    // }
    
});

app.get('/api/book/:booktitle', function(req,res){
    Book.findOne({"title":req.params.title}, function(err,bookMatch){
        if(bookMatch) {
            res.json(bookMatch);
        }else{
            res.status(404).send("404 -Info not Found");
        }
     });
    
    //OLD LOGIC
    // var xTitle = req.params.booktitle.toLowerCase();
    // var xBook = Book.getBook(xTitle);
    // if(xBook){
    //     res.json(xBook);
    // }else{
    //     res.status(404).send("No matched item");
    // }
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



//OLD ROUTES
    // app.get('/', function (req, res){
    //     pageTitle = "MM ITC298 Library - Home";
    //     res.render('home', {
    //         book:books.getLibrary(),
    //         pageTitle}); 
    // });
    