var socket = io.connect('https://abdulchat.herokuapp.com/')
// var socket = io.connect('http://localhost:3000/');
var backgroundColor = 51;
var drawColor = 255;
var size = 20;

setup = () => {
  createCanvas(window.innerWidth, window.innerHeight);
  background(backgroundColor);

  socket.on('sketch', (data) => {
    fill(0);
    noStroke();
    ellipse(data.mouseX, data.mouseY, 20);
  })

  socket.on('clearSketch', (data) => {
    background(backgroundColor)
  })
}

mouseDragged = () => {
  if (mouseIsPressed) {
    fill(drawColor);
    noStroke();
    ellipse(mouseX, mouseY, 20);
  } else {
    fill(drawColor);
    noStroke();
  }

  socket.emit('sketch', {
    mouseX: mouseX,
    mouseY: mouseY
  })
}

clearSketch = () => {
  if (confirm('Are you sure you want to clear the sketch?')) {
    socket.emit('clearSketch', {
      background: backgroundColor
    });
  }
}

rubberMode = () => {
  drawColor = 51;
}

drawMode = () => {
  drawColor = 255;
}
