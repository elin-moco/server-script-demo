var http = require('http');
var session = require('sesh').magicSession();
var fs = require('fs');

var server = http.createServer(function(request, response) {
  // please note: this is just an example of how to hook auth into session.js, its not ideal at all

  // super basic logout
  if(request.url === '/logout'){
    request.session.data.user = "Guest";
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('You\'ve been logged out');
    response.end();
    return;
  }

  if (request.url === '/chat.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    var fileStream = fs.createReadStream('chat.js');
    fileStream.pipe(response);
    return;
  }

  // let's hardcode a username and password variable into the url
  var urlParams = require('url').parse(request.url, true).query || {};

  if(typeof urlParams.name != 'undefined'){
    // if the "name" parameter has been sent, lets log in as that user
    request.session.data.user = urlParams.name;
  }
  var bodyHead = '<html><head><title>Chatroom</title></head><body>';
  var chatroom =
    '<form action="">\
      <input id="m" autocomplete="off" /><button>Send</button>\
    </form>\
    <ul id="messages"></ul>\
';
  var bodyFoot = '</body></html>';
  var scripts =
    '<script src="http://code.jquery.com/jquery-1.11.1.js"></script>' +
    '<script src="/socket.io/socket.io.js"></script>' +
    '<script src="/chat.js"></script>';
  // request.session.data.user always defaults to "Guest"
  if(request.session.data.user == "Guest"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(bodyHead+'Hello, you are <span id="user">Guest</span>'+chatroom+scripts+bodyFoot);
    response.end();
  }
  else{
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(bodyHead+'Hello, you are <span id="user">' + request.session.data.user+'</span>'+chatroom+scripts+bodyFoot);
    response.end();
  }
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(1234, function() {
  console.log('server listening on: http://localhost:1234');
});

