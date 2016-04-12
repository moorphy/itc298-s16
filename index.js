var http = require ('http');
var fs = require('fs');

function servePublicFile(res, path, contentType, responseCode) {
	if(!responseCode) {responseCode = 200};
	fs.readFile(__dirname + path, function (err,data){
		if(err) {
			res.writeHead(500, { 'Content-Type': 'text/plain'});
			res.end('500 - Internal Error');
			} else {
				res.writeHead(responseCode, { 'Content-Type': 'text/plain'});
				res.end(data);
			}
	});
}

http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            servePublicFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
			servePublicFile(res, '/public/about.html', 'text/html');
            break;
        default:
			servePublicFile(res, '/public/404.html', 'text/html', 404);
            break;
    }
    
}).listen(3000);
console.log("Server is up at localhost:3000; To end press ctrl+c");