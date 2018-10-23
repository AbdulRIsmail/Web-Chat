var socket = io.connect('https://abdulchat.herokuapp.com/')
// var socket = io.connect('http://localhost:3000/');
var backgroundColor = 51;

setup = () => {
  createCanvas(window.innerWidth, window.innerHeight);
  background(backgroundColor);

  socket.on('sketch', (data) => {
    fill(255);
    ellipse(data.mouseX, data.mouseY, 20);
  })


  socket.on('clearSketch', (data) => {
    background(backgroundColor)
  })
}

mouseDragged = () => {
  if (mouseIsPressed) {
    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 20);
  } else {
    fill(255);
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
