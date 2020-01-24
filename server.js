// Depedencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

// Serve on port 5000
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
	console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('mouse', function(socket) {
	console.log('Clicked');
  io.sockets.emit('message', 'Done');
});

// Add the WebSocket handlers
io.on('new', function(socket) {
	console.log('Connection');
  io.sockets.emit('message', 'Done');
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
