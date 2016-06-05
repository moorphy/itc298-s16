//index.js

    var express = require('express');
    var server = express();

    // CONFIGURE EXPRESS APP
    server.set('port', process.env.PORT || 3000);//SET PORT
    server.use(express.static(__dirname + '/public'));//CSS & IMG  
    server.use(require('body-parser').urlencoded({extended:true})); //support encoded bodies
    //ROUTES
    require('./routes.js')(server);
    //CROSS ORIGIN RESOURCE SHARING
    server.use('/api', require('cors')());    
     

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

    //START SERVER
    server.listen(server.get('port'), function(){
    console.log('The Server is Up. CTL+C to Terminate')
});

