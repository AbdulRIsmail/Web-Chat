const express = require('express');
const colors = require('colors');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const roomSchema = require('./client/database');
const port = process.env.PORT || 3000;
const app = express();

server = app.listen(port, () => {
    console.log(`Listening To Port ${port}`)
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/views/chat.html");
});

// Socket Setup
var io = socket(server);

io.on('connection', (socket) => {
  console.log('New Socket Connection', colors.yellow(socket.id));

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
app.set("view engine", "html");

app.use(bodyParser.json());


app.post('/api/createroom', (req, res) => {
  (async () => {
    const roomName = req.body.roomName;
    const roomPin = req.body.roomPin;

    if (roomName === '' && roomPin === '') {
      res.send('Please enter room name and room pin!');
      return
    }

    if (roomName === '') {
      res.send('room name is blank!');
      return
    }

    if (roomPin === '') {
      res.send('room pin is blank!');
      return
    }

    if (/[^a-zA-Z0-9]/.test(roomName) && /[^a-zA-Z0-9]/.test(roomPin)) {
      res.send('Room name and Pin may only contain alphanumeric characters (letters or numbers).')
    }

    if (/[^a-zA-Z0-9]/.test(roomName)) {
      res.send('Room name may only contain alphanumeric characters (letters or numbers).')
      return
    }

    if (/[^a-zA-Z0-9]/.test(roomPin)) {
      res.send('Room pin may only contain alphanumeric characters (letters or numbers).')
      return
    }

    const doc = await roomSchema.findOne({roomName: roomName});

    if (doc) {
      res.send('room exists');
    } else {
      // res.send('created room')
      await roomSchema.createRoom(roomName, roomPin);
      var token = jwt.sign({roomId: roomId, roomName: roomName, roomPin: roomPin}, 'supersecret');
      res.send(token)
    }

  })()
});


app.post('/api/joinroom', (req, res) => {
  (async () => {
    const roomName = req.body.roomName;
    const roomPin = req.body.roomPin;

    if (roomName === '' || roomPin === '') {
      res.send('Missing Fields!');
      return
    }

    const doc = await roomSchema.findOne({roomName: roomName});

    // checks if room exists
    if (doc) {

      // checks if the pin matches the room
      if (doc.roomPin === roomPin) {
        res.send('Joining Room!');
        const token = jwt.sign({roomId: doc._id, roomName: roomName, roomPin: roomPin}, 'supersecret');
        console.log(token);
      } else {
        res.send('Invalid Pin!');
      }
    } else {
      res.send('Room does not exist!')
    }

  })()
});

app.post('/api/dashboard', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, 'supersecret', (err, decoded) => {
    if (!err) {
      res.send('validated!')
      console.log(decoded);
    } else {
      res.send(err);
    }
  });
});

app.post('/api/comment', (req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  const post = req.body.post;

  jwt.verify(token, 'supersecret', (err, decoded) => {
    if (!err) {
      roomSchema.comment(decoded.roomName, username, post);
      res.send('Posted Comment!')
    } else {
      res.send(err);
    }
  });
});

app.post('/api/removeComment', (req, res) => {
  const token = req.body.token;
  const commentId = req.body.commentId;

  jwt.verify(token, 'supersecret', (err, decoded) => {
    if (!err) {
      roomSchema.removeComment(decoded.roomId, commentId);
      res.end();
    } else {
      res.send(err);
    }
  });
});




//
