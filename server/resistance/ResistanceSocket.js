const ResistanceRoom = require('./models/ResistanceRoom');
const { v4: uuidv4 } = require('uuid');

class ResistanceSocket {

  registerListeners(io, socket, redisClient) {
    socket.on('init-resistance', () => {
      let roomId = uuidv4().split("-")[0];
      let room = new ResistanceRoom().init(roomId);
      room.storeInRedis(redisClient);
      socket.emit('resistance-created', roomId);
    });
  }
}

module.exports = ResistanceSocket;