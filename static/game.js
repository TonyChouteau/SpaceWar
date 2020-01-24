//var socket = io("localhost:5000");
var socket = io("http://vps.tonychouteau.fr:5000");

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});

document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

socket.emit('new');

setInterval(function() {
  socket.emit('move', movement);
}, 1000 / 60);

socket.on('state', function(players) {
    background(255);
    fill(255,0,0);
    ellipseMode(CENTER);
    for (var id in players){
        var player = players[id];
        //console.log(player.x, player.y);
        ellipse(player.x, player.y, 5, 5);
    }
});

function setup() {
    createCanvas(900, 900);
    background(255);
}
/*
function mousePressed() {
    console.log("Test");
    socket.emit('mouse');
}*/

/*function draw() {
    //ellipse(x, y, w, [h])
}*/