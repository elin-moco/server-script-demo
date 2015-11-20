var http = require('http');

var server = http.createServer(function(request, response) {
  response.end('Hello world!\n');
});

server.listen(1234, function() {
  console.log('server listening on: http://localhost:1234');
});
