const database = require('../../client/database.js');

const roomName = document.getElementById('roomName');
const roomPin = document.getElementById('roomPin');

createRoom = () => {
  database.createRoom(roomName, roomPin);
}
