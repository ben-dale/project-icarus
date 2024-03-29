const AvalonRoom = require('./models/AvalonRoom');
const AvalonPlayer = require('./models/AvalonPlayer');
const AllPlayers = require('../common/models/AllPlayers');
const { v4: uuidv4 } = require('uuid');

class AvalonSocket {

  registerListeners(io, socket, redisClient) {
    socket.on('player-joined', (data) => this.playerJoined(io, redisClient, socket, data));
    socket.on('disconnect', () => this.playerDisconnected(io, redisClient, socket));
    socket.on('player-rejoined', (data) => this.playerRejoined(io, redisClient, socket, data));
    socket.on('player-updated', (data) => this.playerUpdated(io, redisClient, socket, data));
    socket.on('room-updated', (data) => this.roomUpdated(io, redisClient, socket, data));
    socket.on('init-avalon', () => {
      let roomId = uuidv4().split("-")[0];
      let room = new AvalonRoom().init(roomId);
      room.storeInRedis(redisClient);
      socket.emit('avalon-created', roomId);
    });
    socket.on('get-room', (data) => {
      if (data && data.roomId) {
        new AvalonRoom().getFromRedis(redisClient, data.roomId, (room) => {
          socket.emit('room-updated', room);
        }, () => { });
      }
    })
  }

  playerDisconnected(io, redisClient, socket) {
    new AvalonPlayer().getFromRedis(redisClient, socket.id, (player) => {
      new AvalonRoom().getFromRedis(redisClient, player.roomId, (room) => {
        var updatedRoom = room.copy();
        if (updatedRoom.game.closed) {
          updatedRoom = updatedRoom.disconnectActivePlayer(player.id);
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
  }

  playerJoined(io, redisClient, socket, data) {
    console.log(data);
    if (data && data.name && data.name.length > 0 && data.roomId) {
      new AvalonRoom().getFromRedis(redisClient, data.roomId, (room) => {
        if (!room.game.closed) {
          console.log('player joined room ' + socket.id);
          let player = new AvalonPlayer().init(socket.id, data.name.substring(0, 8), data.roomId);
          player.storeInRedis(redisClient);
          
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
  }

  playerUpdated(io, redisClient, socket, data) {
    console.log(data);
    if (data) {
      new AvalonPlayer().getFromRedis(redisClient, socket.id, (player) => {
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
        updatedPlayer.emitAssignmentInformation(io);

        new AvalonRoom().getFromRedis(redisClient, updatedPlayer.roomId, (room) => {
          new AllPlayers().getFromRedis(redisClient, room.playerIds, (allPlayers) => {
            if (allPlayers.areReady() && room.hasEnoughPlayers()) {
              const updatedRoom = room.next(redisClient, io, allPlayers, room.id);
              updatedRoom.storeInRedis(redisClient);
              updatedRoom.emitToAll(io);
            }
          }, () => { });
        }, () => { });
      }, () => { });
    }
  }


  roomUpdated(io, redisClient, socket, data) {
    if (data) {
      new AvalonPlayer().getFromRedis(redisClient, socket.id, (player) => {
        new AvalonRoom().getFromRedis(redisClient, player.roomId, (room) => {
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
          if (data.game && data.game.settings && data.game.settings.hasOwnProperty('questLogEnabled') && player.id == room.ownerId) {
            updatedRoom.game.settings = updatedRoom.game.settings.withQuestLogEnabled(data.game.settings.questLogEnabled);
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
            // TODO - finish off mutation with all of the code above?
            updatedRoom.game = updatedRoom.game.revealVote(data.game.currentQuest.voteToReveal); 
          }

          updatedRoom.storeInRedis(redisClient);
          updatedRoom.emitToAll(io);
        }, () => { });
      }, () => { });
    }
  }

  playerRejoined(io, redisClient, socket, data) {
    if (data && data.id && data.id.length > 0 && data.roomId) {
      new AvalonRoom().getFromRedis(redisClient, data.roomId, (room) => {
        new AvalonPlayer().getFromRedis(redisClient, data.id, (existingPlayer) => {
          const oldPlayerId = existingPlayer.id;
          const newPlayerId = socket.id;
          new AllPlayers().getFromRedis(redisClient, room.playerIds, (allPlayers) => {
            // Add player with new socket id to room
            socket.join(room.id);

            // update refs across all players
            const updatedPlayers = allPlayers.reconnectPlayer(oldPlayerId, newPlayerId);
            updatedPlayers.storeInRedis(redisClient);

            // Emit private info to individual players, and general information to all players
            updatedPlayers.emitToAll(io, room.id);

            if (room.game.screen == 'GAME' && room.game.state == 'QUEST_PROPOSAL_RESULT') {
              updatedPlayers.emitToAllWithVote(io, room.id);
            }

            // update refs across the room and game
            var updatedRoom = room.reconnectPlayer(oldPlayerId, newPlayerId);
            updatedRoom.storeInRedis(redisClient);
            updatedRoom.emitToAll(io);
          }, () => { });
        }, () => { });
      }, () => { })
    }
  }
}

module.exports = AvalonSocket;