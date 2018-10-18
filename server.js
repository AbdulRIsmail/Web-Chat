var express = require('express');
var colors = require('colors');
var socket = require('socket.io');
var port = process.env.PORT || 3000;
var app = express();

var server = app.listen(port, () => {
    console.log(`Listening To Port ${port}`)
});


// Static Files - make them global and work within express
app.use(express.static('public/views'));
app.use(express.static('public/'));


// Socket Setup
var io = socket(server);

io.on('connection', (socket) => {
  console.log('New Socket Connection', colors.yellow(socket.id))

  // Handle Chat Event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

  // Sketch
  socket.on('sketch', (data) => {
    socket.broadcast.emit('sketch', data)
  })

  socket.on('clearSketch', (data) => {
    io.sockets.emit('clearSketch', data)
  })

});
