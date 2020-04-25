const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: function () {
    return uuidv4().split("-")[0];
  },
  init: function (redis, socket, roomId) {
    socket.join(roomId);
    redis.putObject(roomId, { open: true, members: {}, owner: socket.id });
  }
}