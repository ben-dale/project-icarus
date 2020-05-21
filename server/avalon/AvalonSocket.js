const Room = require('../common/models/Room.js');
const Player = require('../common/models/Player.js');
const AllPlayers = require('../common/models/AllPlayers.js');
const { v4: uuidv4 } = require('uuid');

class AvalonSocket {

  registerListeners(io, socket, redisClient) {
    socket.on('init-avalon', () => {
      let roomId = uuidv4().split("-")[0];

      let room = new Room().init(roomId);
      room.storeInRedis(redisClient);

      socket.emit('avalon-created', roomId);
    });

    console.log(socket.id + ' connected');
    socket.on('disconnect', function () {
      new Player().getFromRedis(redisClient, socket.id, (player) => {
        new Room().getFromRedis(redisClient, player.roomId, (room) => {
          var updatedRoom = room.copy();
          if (updatedRoom.game.closed) {
            updatedRoom = updatedRoom.withActiveDisconnectedPlayer(player.id);
          } else {
            updatedRoom = updatedRoom.disconnectPlayer(player.id);
          }

          updatedRoom.storeInRedis(redisClient);
          new AllPlayers().getFromRedis(redisClient, updatedRoom.playerIds, (allPlayers) => {
            updatedRoom.emitToAll(io);
            allPlayers.emitToAll(io, room.id);
          }, () => { });
        }, () => { });
      }, () => { });
      console.log(socket.id + ' disconnected');
    });


    socket.on('get-room', (data) => {
      if (data && data.roomId) {
        new Room().getFromRedis(redisClient, data.roomId, (room) => {
          socket.emit('room-updated', room);
        }, () => { });
      }
    })

    socket.on('player-joined', (data) => {
      console.log(data);
      if (data && data.name && data.name.length > 0 && data.roomId) {
        new Room().getFromRedis(redisClient, data.roomId, (room) => {
          const playerId = socket.id;

          let player = new Player().init(playerId, data.name.substring(0, 8), data.roomId);
          player.storeInRedis(redisClient);

          if (!room.game.closed) {
            console.log('player joined room ' + socket.id);
            const updatedRoom = room.addPlayerId(socket.id);
            updatedRoom.storeInRedis(redisClient);

            socket.join(data.roomId);

            new AllPlayers().getFromRedis(redisClient, updatedRoom.playerIds, (allPlayers) => {
              updatedRoom.emitToAll(io);
              allPlayers.emitToAll(io, data.roomId);
            }, () => { });
          } else {
            // Player is attempting to join a closed room so just emit the current room state to them for now
            socket.emit('room-updated', room);
          }
        });
      }
    });

    socket.on('player-rejoined', (data) => {
      if (data && data.name && data.name.length > 0 && data.roomId) {
        new Room().getFromRedis(redisClient, data.roomId, (room) => {
          new Player().getFromRedis(redisClient, data.name, (existingPlayer) => {
            const oldPlayerId = existingPlayer.id;
            const newPlayerId = socket.id;
            new AllPlayers().getFromRedis(redisClient, room.playerIds, (allPlayers) => {
              // Add player with new socket id to room
              socket.join(room.id);

              // update refs across all players
              const updatedPlayers = allPlayers.reconnectPlayer(oldPlayerId, newPlayerId);
              updatedPlayers.storeInRedis(redisClient);
              updatedPlayers.emitToAll(io, room.id);

              // Emit sensitive player info back to each player as this may have been updated
              // todo mark all players as not ready when player has left the game?
              updatedPlayers.players.forEach(p => p.emitToPlayer(io));

              // update refs across the room and game
              var updatedRoom = room.reconnectPlayer(oldPlayerId, newPlayerId);
              updatedRoom.storeInRedis(redisClient);
              updatedRoom.emitToAll(io);
            }, () => { });
          }, () => { });
        }, () => { })
      }
    });

    socket.on('player-updated', (data) => {
      console.log(data);
      if (data) {
        new Player().getFromRedis(redisClient, socket.id, (player) => {
          let updatedPlayer = player.copy();
          if (data.hasOwnProperty('ready')) {
            updatedPlayer = updatedPlayer.withReady(data.ready);
          }

          if (data.hasOwnProperty('approveProposal')) {
            updatedPlayer = updatedPlayer.withProposalApproved(data.approveProposal);
          }

          if (data.hasOwnProperty('succeedQuest')) {
            updatedPlayer = updatedPlayer.withSucceedQuest(data.succeedQuest);
          }

          updatedPlayer.storeInRedis(redisClient);
          updatedPlayer.emitToAll(io);

          new Room().getFromRedis(redisClient, updatedPlayer.roomId, (room) => {
            new AllPlayers().getFromRedis(redisClient, room.playerIds, (allPlayers) => {
              if (allPlayers.areReady() && room.hasEnoughPlayers()) { // Need to put in a condition to stop play if a player leaves
                room.game.next(redisClient, io, allPlayers, room.id); // This mutates the game instance which is grim
                room.storeInRedis(redisClient);
                room.emitToAll(io);
              }
            }, () => { });
          }, () => { });
        }, () => { });
      }
    });

    socket.on('room-updated', (data) => {
      console.log(data);
      if (data) {
        new Player().getFromRedis(redisClient, socket.id, (player) => {
          new Room().getFromRedis(redisClient, player.roomId, (room) => {
            let updatedRoom = room.copy();
            if (data.game && data.game.settings && data.game.settings.hasOwnProperty('percivalEnabled') && player.id == room.ownerId) {
              updatedRoom.game.settings = updatedRoom.game.settings.withPercivalEnabled(data.game.settings.percivalEnabled);
            }
            if (data.game && data.game.settings && data.game.settings.hasOwnProperty('oberonEnabled') && player.id == room.ownerId) {
              updatedRoom.game.settings = updatedRoom.game.settings.withOberonEnabled(data.game.settings.oberonEnabled);
            }
            if (data.game && data.game.settings && data.game.settings.hasOwnProperty('morganaEnabled') && player.id == room.ownerId) {
              updatedRoom.game.settings = updatedRoom.game.settings.withMorganaEnabled(data.game.settings.morganaEnabled);
            }

            if (data.game && data.game.currentQuest && data.game.currentQuest.hasOwnProperty('playerIdToPropose') && room.game.currentQuest.organiserId == player.id && room.game.currentQuest.proposedPlayerIds.length < room.game.currentQuest.requiredPlayers) {
              const playerIdToPropose = data.game.currentQuest.playerIdToPropose;
              if (!updatedRoom.game.currentQuest.hasProposedPlayerId(playerIdToPropose) && room.hasPlayerId(playerIdToPropose)) {
                updatedRoom.game.currentQuest = updatedRoom.game.currentQuest.withProposedPlayerId(playerIdToPropose);
              }
            }

            if (data.game && data.game.currentQuest && data.game.currentQuest.hasOwnProperty('playerIdToUnpropose') && room.game.currentQuest.organiserId == player.id) {
              const playerIdToUnpropose = data.game.currentQuest.playerIdToUnpropose;
              if (updatedRoom.game.currentQuest.hasProposedPlayerId(playerIdToUnpropose) && room.hasPlayerId(playerIdToUnpropose)) {
                updatedRoom.game.currentQuest = updatedRoom.game.currentQuest.removeProposedPlayerId(playerIdToUnpropose);
              }
            }

            if (data.game && data.game.currentQuest && data.game.currentQuest.hasOwnProperty('merlinIdToPropose')) {
              console.log(player.role);
              const merlinIdToPropose = data.game.currentQuest.merlinIdToPropose;
              if (!updatedRoom.game.currentQuest.hasProposedPlayerId(merlinIdToPropose) && room.hasPlayerId(merlinIdToPropose)) {
                updatedRoom.game.currentQuest = updatedRoom.game.currentQuest.withProposedPlayerId(merlinIdToPropose);
              }
            }

            if (data.game && data.game.currentQuest && data.game.currentQuest.hasOwnProperty('merlinIdToUnpropose')) {
              console.log(player.role);
              const merlinIdToUnpropose = data.game.currentQuest.merlinIdToUnpropose;
              if (updatedRoom.game.currentQuest.hasProposedPlayerId(merlinIdToUnpropose) && room.hasPlayerId(merlinIdToUnpropose)) {
                updatedRoom.game.currentQuest = updatedRoom.game.currentQuest.removeProposedPlayerId(merlinIdToUnpropose);
              }
            }

            if (data.game && data.game.currentQuest && data.game.currentQuest.hasOwnProperty('voteToReveal') && room.game.currentQuest.organiserId == player.id) {
              updatedRoom.game.revealVote(data.game.currentQuest.voteToReveal); // MORE MUTATION OH NO
            }

            updatedRoom.storeInRedis(redisClient);
            updatedRoom.emitToAll(io);
          }, () => { });
        }, () => { });
      }
    });
  }
}

module.exports = AvalonSocket;