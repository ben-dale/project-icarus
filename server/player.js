module.exports = {
  ready: function (redis, socket, io, roomId) {
    redis.getObject(roomId, (room) => {
      room.members[socket.id].ready = true;
      redis.putObject(roomId, room);
      io.in(roomId).emit('room-updated', { members: room.members, owner: room.owner });
    }, () => { });
  },
  notReady: function (redis, socket, io, roomId) {
    redis.getObject(roomId, (room) => {
      room.members[socket.id].ready = false;
      redis.putObject(roomId, room);
      io.in(roomId).emit('room-updated', { members: room.members, owner: room.owner });
    }, () => { });
  },
  join: function (redis, socket, io, roomId, name) {
    socket.join(roomId);
    redis.getObject(roomId, (room) => {
      if (room && name) {
        room.members[socket.id] = { name: name, ready: false };
        redis.putObject(roomId, room);
        redis.putObject(socket.id, { roomId: roomId }); // Store player object so we can link back to room by socket id
        io.in(roomId).emit('room-updated', { members: room.members, owner: room.owner });
      }
    }, () => { });
  },
  leave: function (redis, socket, io) {
    redis.getObject(socket.id, (player) => {
      if (player.roomId) {
        redis.getObject(player.roomId, (room) => {
          delete room.members[socket.id];
          if (room.owner == socket.id && Object.keys(room.members).length >= 1) {
            // If owner leaves ownership is moved to someone else in the room
            room.owner = Object.keys(room.members)[0];
          } else if (Object.keys(room.members) == 1) {
            // If last person in lobby leaving the room regardless of ownership, delete the room
            
          }
          redis.putObject(player.roomId, room);
          io.in(player.roomId).emit('room-updated', { members: room.members, owner: room.owner });
        }, () => { })
      }
    }, () => { });
  }
}