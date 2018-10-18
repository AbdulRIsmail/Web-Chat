var socket = io.connect('https://abdulchat.herokuapp.com/')
// var socket = io.connect('http://localhost:3000/');
var backgroundColor = 51;

setup = () => {
  createCanvas(window.innerWidth, window.innerHeight);
  background(backgroundColor);

  socket.on('sketch', (data) => {
    fill(0);
    ellipse(data.mouseX, data.mouseY, 20);
  })

  socket.on('clearSketch', (data) => {
    background(backgroundColor)
  })
}

mouseDragged = () => {
  if (mouseIsPressed) {
    fill(0);
    ellipse(mouseX, mouseY, 20);
  } else {
    fill(0);
  }

  socket.emit('sketch', {
    mouseX: mouseX,
    mouseY: mouseY
  })
}

clearSketch = () => {
  socket.emit('clearSketch', {
    background: backgroundColor
  });

}
