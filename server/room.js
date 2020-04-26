const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: function () {
    return uuidv4().split("-")[0];
  },
  init: function (redis, socket, roomId) {
    socket.join(roomId);
    let player = { id: socket.id, ready: false, role: "", team: "", roomId: roomId };
    redis.putObject(player.id, player); // Player will "offically" be part of the room when they enter their name (and client calls "player-join")
    redis.putObject(roomId, { open: true, players: [], owner: socket.id, settings: { morganaSelected: false, percivalSelected: false, oberonSelected: false } });
  },
  updateSettings: function (redis, socket, io, roomId, settings) {
    redis.getObject(roomId, (room) => {
      if (socket.id == room.owner) {
        room.settings = { morganaSelected: settings.morganaSelected, percivalSelected: settings.percivalSelected, oberonSelected: settings.oberonSelected }
        redis.putObject(roomId, room);
        redis.getObjects(room.players, (players) => {
          io.in(roomId).emit('room-updated', { players: players, owner: room.owner, settings: room.settings });
        });
      }
    }, () => { });
  }
}