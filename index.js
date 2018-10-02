var express = require('express');
var app = express();
var socket = require('socket.io');
var port = process.env.PORT || 3000;


var server = app.listen(port, () => {
    console.log(`Listening To Port ${port}`)
});


// Static Files - make them global and work within express
app.use(express.static('public'));


// Socket Setup
var io = socket(server);

io.on('connection', (socket) => {
  console.log('Made Socket Connection', socket.id)

  // Handle Chat Event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

});
