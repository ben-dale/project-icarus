const avalon = require('./avalon.js');

module.exports = {
  ready: function (redis, socket, io, screen) {
    redis.getObject(socket.id, (player) => {
      if (player) {
        player.ready = true;
        redis.putObject(socket.id, player);
        delete player.team;
        delete player.role;
        io.in(Object.keys(socket.rooms)[1]).emit('player-updated', player);
        this.checkIfAllPlayersAreReady(redis, io, player.roomId, screen);
      }
    }, () => { });
  },
  notReady: function (redis, socket, io) {
    redis.getObject(socket.id, (player) => {
      if (player) {
        player.ready = false;
        redis.putObject(socket.id, player);
        delete player.team;
        delete player.role;
        io.in(Object.keys(socket.rooms)[1]).emit('player-updated', player);
      }
    }, () => { });
  },
  join: function (redis, socket, io, roomId, name) {
    socket.join(roomId);
    redis.getObject(roomId, (room) => {
      if (room && name) {
        // Store new player in Redis
        let player = { id: socket.id, name: name, ready: false, role: "", team: "", roomId: roomId };
        redis.putObject(socket.id, player);

        // Add new player to room and write to Redis
        room.players.push(socket.id);
        redis.putObject(roomId, room);

        // Send all room information back to clients
        this.sendRoomInformationToAll(redis, io, room, roomId);
      }
    }, () => { });
  },
  leave: function (redis, socket, io) {
    redis.getObject(socket.id, (player) => {
      if (player) {
        redis.getObject(player.roomId, (room) => {
          room.players = room.players.filter(playerId => playerId !== socket.id);
          if (room.owner === socket.id && room.players.length >= 1) {
            // If owner leaves ownership is moved next person in room
            room.owner = room.players[0];
          }
          redis.putObject(player.roomId, room);

          // Send all room information back to clients
          this.sendRoomInformationToAll(redis, io, room, player.roomId);
        }, () => { })
      }
    }, () => { });
  },
  sendRoomInformationToAll: function (redis, io, room, roomId) {
    redis.getObjects(room.players, (players) => {
      for (let i = 0; i < players.length; i++) {
        delete players[i].team;
        delete players[i].role;
      }
      io.in(roomId).emit('room-updated', { players: players, owner: room.owner, settings: room.settings });
    });
  },
  checkIfAllPlayersAreReady: function (redis, io, roomId, screen) {
    redis.getObject(roomId, (room) => {
      if (room && room.players) {
        redis.getObjects(room.players, (players) => {
          let ready = true;
          for (let i = 0; i < players.length; i++) {
            if (!players[i].ready) {
              ready = false;
            }
          }
          if (ready && screen === "lobbyScreen") {
            avalon.initGame(redis, io, roomId);
          } else if (ready && screen === "revealScreen") {
            avalon.startGame(redis, io, roomId);
          }
        }, () => { });
      }
    }, () => { });
  }
}