const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: function () {
    return uuidv4().split("-")[0];
  },
  init: function (redis, socket, roomId) {
    socket.join(roomId);
    redis.putObject(roomId, { open: true, members: {}, owner: socket.id });
  },
  join: function (redis, socket, io, roomId, name) {
    socket.join(roomId);
    redis.getObject(roomId, (room) => {
      if (room && name) {
        room.members[socket.id] = { name: name };
        redis.putObject(roomId, room);
        io.in(roomId).emit('member-joined', { members: room.members });
      }
    }, () => { });
  }
}