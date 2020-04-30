module.exports = {
  init: function (redis, playerId, roomId) {
    let player = { id: playerId, ready: false, role: "", team: "", roomId: roomId, vote: "" };
    redis.putObject(playerId, player);
  },
  markAsReady: function (redis, playerId, onSuccess) {
    redis.getObject(playerId, (player) => {
      if (player) {
        player.ready = true;
        redis.putObject(playerId, player);
        delete player.team;
        delete player.role;
        onSuccess(player);
      }
    }, () => { });
  },
  markAsNotReady: function (redis, playerId, onSuccess) {
    redis.getObject(playerId, (player) => {
      if (player) {
        player.ready = false;
        redis.putObject(playerId, player);
        delete player.team;
        delete player.role;
        onSuccess(player);
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
        room.playerIds.push(socket.id);
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
          room.playerIds = room.playerIds.filter(playerId => playerId !== socket.id);
          if (room.ownerId === socket.id && room.playerIds.length >= 1) {
            // If owner leaves ownership is moved next person in room
            room.ownerId = room.playerIds[0];
          }
          redis.putObject(player.roomId, room);

          // Send all room information back to clients
          this.sendRoomInformationToAll(redis, io, room, player.roomId);
        }, () => { })
      }
    }, () => { });
  },
  sendRoomInformationToAll: function (redis, io, room, roomId) {
    redis.getObjects(room.playerIds, (players) => {
      for (let i = 0; i < players.length; i++) {
        delete players[i].team;
        delete players[i].role;
      }
      io.in(roomId).emit('room-updated', { players: players, ownerId: room.ownerId, settings: room.settings, game: room.game, screen: room.screen });
    });
  }
}