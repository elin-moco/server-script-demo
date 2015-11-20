var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
  if (request.url === '/lazy.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    var fileStream = fs.createReadStream('lazy.js');
    fileStream.pipe(response);
    return;
  }

  if (request.url == '/api/lazy') {
    response.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify({
      title: 'I am lazy',
      description: 'This is a lazy content'
    });
    console.log(json);
    response.end(json);
    return;
  }

  if (request.url == '/lazy') {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(
      '<html><head><title>Lazy Demo</title></head><body>' +
      '<script src="lazy.js"></script>' +
      '</body></html>'
    );
    return;
  }

  response.end('Hello world!\n');

});

server.listen(1234, function() {
  console.log('server listening on: http://localhost:1234');
});
