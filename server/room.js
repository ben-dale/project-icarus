const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: function () {
    return uuidv4().split("-")[0];
  },
  init: function (redis, roomId, roomId, ownerId) {
    redis.putObject(roomId, { open: true, players: [], owner: ownerId, settings: { morganaSelected: false, percivalSelected: false, oberonSelected: false }, game: {} });
  },
  updateSettings: function (redis, playerId, roomId, settings, onSuccess) {
    redis.getObject(roomId, (room) => {
      if (room && playerId === room.owner) {
        room.settings = { morganaSelected: settings.morganaSelected, percivalSelected: settings.percivalSelected, oberonSelected: settings.oberonSelected }
        redis.putObject(roomId, room);
        redis.getObjects(room.players, (players) => {
          for (let i = 0; i < players.length; i++) {
            delete players[i].team;
            delete players[i].role;
          }
          onSuccess({ players: players, owner: room.owner, settings: room.settings, game: room.game });
        });
      }
    }, () => { });
  },
  allPlayersAreReady: function (redis, roomId, onSuccess) {
    redis.getObject(roomId, (room) => {
      if (room && room.players) {
        redis.getObjects(room.players, (players) => {
          for (let i = 0; i < players.length; i++) {
            if (!players[i].ready) {
              return;
            }
          }
          onSuccess();
        }, () => { });
      }
    }, () => { });
  }
}