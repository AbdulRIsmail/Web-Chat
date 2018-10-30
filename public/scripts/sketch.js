var socket = io.connect('http://abdulchat.herokuapp.com/')
// var socket = io.connect('http://localhost:3000/');
var backgroundColor = 51;
var drawColor = 255;
var brushSize = 20;

setup = () => {
  createCanvas(2000, 1000);
  background(backgroundColor);

  socket.on('sketch', (data) => {
    fill(drawColor);
    noStroke();
    ellipse(data.mouseX, data.mouseY, brushSize);
  })

  socket.on('clearSketch', (data) => {
    background(backgroundColor)
  })
}

mouseDragged = () => {
  if (mouseIsPressed) {
    fill(drawColor);
    noStroke();
    ellipse(mouseX, mouseY, brushSize);
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
  brushSize = 60;
}

drawMode = () => {
  drawColor = 255;
  brushSize = 20;
}
