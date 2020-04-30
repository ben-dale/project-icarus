const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: function () {
    return uuidv4().split("-")[0];
  },
  init: function (redis, roomId, roomId, ownerId) {
    redis.putObject(roomId, { open: true, playerIds: [], ownerId: ownerId, settings: { morganaSelected: false, percivalSelected: false, oberonSelected: false }, game: {}, screen: "lobby" });
  },
  updateSettings: function (redis, playerId, roomId, settings, onSuccess) {
    redis.getObject(roomId, (room) => {
      if (room && playerId === room.ownerId) {
        room.settings = { morganaSelected: settings.morganaSelected, percivalSelected: settings.percivalSelected, oberonSelected: settings.oberonSelected }
        redis.putObject(roomId, room);
        redis.getObjects(room.playerIds, (players) => {
          for (let i = 0; i < players.length; i++) {
            delete players[i].team;
            delete players[i].role;
          }
          onSuccess({ players: players, ownerId: room.ownerId, settings: room.settings, game: room.game, screen: room.screen });
        });
      }
    }, () => { });
  },
  allPlayersAreReady: function (redis, roomId, onSuccess) {
    redis.getObject(roomId, (room) => {
      if (room && room.playerIds) {
        redis.getObjects(room.playerIds, (players) => {
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