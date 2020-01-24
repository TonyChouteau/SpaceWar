var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

function setup(){
    createCanvas(900, 900);
    background(0);
}

function mousePressed(){
    io.sockets.emit('connection', 'hi!');
}

function loop(){

}