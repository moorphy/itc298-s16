//index.js

    var express = require('express');
    var app = express();

    // CONFIGURE EXPRESS APP
    app.set('port', process.env.PORT || 3000);//SET PORT
    app.use(express.static('public'));//CSS & IMG  
    app.use(require("body-parser").json()); 
    app.use(require('body-parser').urlencoded({extended:true})); //support encoded bodies
   
    //ROUTES
    var routes = require('./routes')(app);
   
    //CROSS ORIGIN RESOURCE SHARING
    app.use('/api', require('cors')());    
     

    //TEMPLATE ENGINE
    var handlebars = require('express-handlebars').create({
        defaultLayout:'main', 
        extname: '.hbs' });
    app.engine('hbs', handlebars.engine);
    app.set('view engine', 'hbs');

    //START app
    app.listen(app.get('port'), function(){
    console.log('The Server is Up. CTL+C to Terminate')
});

