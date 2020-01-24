var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
socket.emit('new');

function setup(){
    createCanvas(900, 900);
    background(255);
}

function mousePressed(){
    socket.emit('mouse');
}

function draw(){

}