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
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

//Variables

let players = {};

// Add the WebSocket handlers
io.on('connection', function (socket) {

  socket.on('new', function () {
    console.log("New player : "+socket.id)
    players[socket.id] = {
      x:450.0,
      y:450.0,
    }
  });

  socket.on('move', function (data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 1;
    }
    if (data.up) {
      player.y -= 1;
    }
    if (data.right) {
      player.x += 2;
    }
    if (data.down) {
      player.y += 2;
    }
  });
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000/60);