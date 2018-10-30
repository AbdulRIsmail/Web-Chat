const mongoose = require('mongoose');
const colors = require('colors');

mongoose.connect('mongodb://localhost:27017/room', {useNewUrlParser: true}, (err) => {
  if (err) throw err;
  console.log(colors.red('Successfully Connected to Database'));
})

const roomSchema = mongoose.Schema({
  roomName: String,
  roomPin: String,
})

const roomInfo = mongoose.model('roomInfo', roomSchema);

// createRoom = async (roomName, roomPin) => {
//   await roomInfo({
//     roomName: roomName,
//     roomPin: roomPin
//   }).save();
// };

module.exports = roomInfo;
