var socket = io("http://vps.tonychouteau.fr:5000");

socket.on('message', function (data) {
    console.log(data);
});

function setup() {
    createCanvas(900, 900);
    background(255);
}

function mousePressed() {
    console.log("Test");
    socket.emit('mouse');
}

function draw() {

}