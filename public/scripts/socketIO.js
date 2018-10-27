// var socket = require('socket.io');
// var server = require('../server');
//
// // Socket Setup
// var io = socket(server.server);
//
// io.on('connection', (socket) => {
//   console.log('New Socket Connection', colors.yellow(socket.id))
//
//   // Handle Chat Event
//   socket.on('chat', (data) => {
//     io.sockets.emit('chat', data)
//   })
//
//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', data)
//   })
//
//   // Sketch
//   socket.on('sketch', (data) => {
//     socket.broadcast.emit('sketch', data)
//   })
//
//   socket.on('clearSketch', (data) => {
//     io.sockets.emit('clearSketch', data)
//   })
//
//   socket.on('rubber', (data) => {
//     io.sockets.emit('rubber', data)
//   })
//
//   socket.on('draw', (data) => {
//     io.sockets.emit('draw', data)
//   })
// });
