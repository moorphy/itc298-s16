//index.js

    var express = require('express');
    var app = express();

    // CONFIGURE EXPRESS APP
    app.set('port', process.env.PORT || 3000);//SET PORT
    app.use(express.static(__dirname + '/public'));//CSS & IMG  
    app.use(require('body-parser').urlencoded({extended:true})); //support encoded bodies
    //ROUTES
    require('./routes.js')(app);
    //CROSS ORIGIN RESOURCE SHARING
    app.use('/api', require('cors')());    
     

    //TEMPLATE ENGINE
    var viewsPath = __dirname + '/views'; 
    var handlebars = require('express-handlebars').create({
        defaultLayout:'main', 
        extname: '.hbs',
        layoutsDir: viewsPath + '/layouts',  
        partialsDir: viewsPath + '/partials' });
    app.engine('hbs', handlebars.engine);
    app.set('views', viewsPath);
    app.set('view engine', 'hbs');

    //START app
    app.listen(app.get('port'), function(){
    console.log('The Server is Up. CTL+C to Terminate')
});

