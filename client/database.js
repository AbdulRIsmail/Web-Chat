const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const colors = require('colors');

mongoose.connect('mongodb://localhost:27017/room', {useNewUrlParser: true}, (err) => {
  if (err) throw err;
  console.log('Successfully Connected to Database');
})

const chatSchema = mongoose.Schema({
  username: String,
  post: String,
})

const roomSchema = mongoose.Schema({
  roomName: String,
  roomPin: String,
  posts: [chatSchema]
})

const roomInfo = mongoose.model('roomInfo', roomSchema);

createRoom = async (roomName, roomPin) => {
  await roomInfo({
    roomName: roomName,
    roomPin: roomPin
  }).save();
};

comment = async (roomName, username, post) => {
  await roomInfo.updateOne({roomName: roomName},
    {$push:
      {posts:
        {username: username, post: post}
      }
    })
}

removeComment = async (roomId, commentId) => {
  const comment = await roomInfo.updateOne({_id: roomId}, {  $pull: {posts: {_id: commentId} }});

  if (comment.nModified == 0) {
    console.log('comment already removed!');
    return false
  } else {
    console.log('removing comment');
    return true
  }

  return false
}

module.exports = roomInfo;
module.exports.comment = comment;
module.exports.removeComment = removeComment;
module.exports.createRoom = createRoom;
