const express = require('express');
const colors = require('colors');
const socket = require('socket.io');
const token = require('./client/tokenHelper');
const roomSchema = require('./client/database');
const port = process.env.PORT || 3000;
const app = express();

server = app.listen(port, () => {
    console.log(`Listening To Port ${port}`)
});

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

  socket.on('rubber', (data) => {
    io.sockets.emit('rubber', data)
  })

  socket.on('draw', (data) => {
    io.sockets.emit('draw', data)
  })
});

// Static Files - make them global and work within express
app.use(express.static('public/views'));
app.use(express.static('public/'));
app.set("view engine", "html")


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/api/createroom', (req, res) => {
  // res.sendFile(__dirname + "/test.html");

  (async () => {
    console.log('valled')
    const doc = await roomSchema.findOne({roomName: req.body.roomName}, {})
    if (doc){
      res.send('exist')

    }else {
      res.send('not exit')
    }


  })()


  // res.send(req.body)
})
