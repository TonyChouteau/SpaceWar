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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "vps.tonychouteau.fr"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routing
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

//Variables

let x = 0;

setInterval(function () {
  io.sockets.emit('message', x);
}, 1000);

io.on('mouse', function () {
  x++;
  io.sockets.emit('message', 'Done');
});

// Add the WebSocket handlers
io.on('connection', function (socket) {

  socket.on('mouse', function () {
    x++;
    console.log(x);
    io.sockets.emit('message', 'Done');
  });

  socket.on('new', function () {
    x++;
    console.log(x);
    io.sockets.emit('message', x);
  });
});