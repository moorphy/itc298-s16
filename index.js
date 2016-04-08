var http = require("http")
var fs = require("fs");

http.createServer(function(req,res){
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('HOMEPAGE');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About Page');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
            break;
    }
   //console.log("Is this thing working yet?");
   //res.writeHead(100, {'Content-Type': 'text/plain'});
   //res.end("Wassup World");
    
}).listen(process.env.PORT);
console.log("Someone is on your site");