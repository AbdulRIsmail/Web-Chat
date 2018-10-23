// Make Connection
var socket = io.connect('https://abdulchat.herokuapp.com/')
// var socket = io.connect('http://localhost:3000/')

// Query DOM

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


// Emit Events
btn.addEventListener('click', () => {
  if (handle.value === '' || message.value === '') {
    console.log('Please use name and message');
    return
  }

  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  })
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});


// Listen For Events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
  message.value = '';
});

// Listen For Events
socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})
