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
    ellipse(data.mouseX, data.mouseY, size);
  })

  socket.on('clearSketch', (data) => {
    background(backgroundColor)
  })
}

mouseDragged = () => {
  if (mouseIsPressed) {
    fill(drawColor);
    noStroke();
    ellipse(mouseX, mouseY, size);
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
  size = 60;
}

drawMode = () => {
  drawColor = 255;
  size = 20;
}
