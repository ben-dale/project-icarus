const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: function () {
    return uuidv4().split("-")[0];
  },
  init: function (redis, socket, roomId) {
    socket.join(roomId);
    redis.putObject(roomId, { open: true, members: {}, owner: socket.id, settings: { morganaSelected: false, percivalSelected: false, oberonSelected: false } });
  },
  updateSettings: function (redis, socket, io, roomId, settings) {
    redis.getObject(roomId, (room) => {
      if (socket.id == room.owner) {
        let updatedRoom = { open: room.open, members: room.members, owner: room.owner, settings: { morganaSelected: settings.morganaSelected, percivalSelected: settings.percivalSelected, oberonSelected: settings.oberonSelected } }
        redis.putObject(roomId, updatedRoom);
        io.in(roomId).emit('room-updated', updatedRoom);
      }
    }, () => { });
  }
}