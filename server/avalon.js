const RandomInteger = require('./RandomInteger');
const AllPlayers = require('./AllPlayers');
const Avalon = require('./Avalon');

module.exports = {
  initGame: function (redis, io, roomId) {
    redis.getObject(roomId, (room) => {
      if (room && room.playerIds.length >= 5) {
        room.closed = true;
        room.screen = "roleReveal";
        room.game = new Avalon(room.playerIds).init();
        redis.putObject(roomId, room);

        redis.getObjects(room.playerIds, (players) => {
          let allPlayers = AllPlayers(players);
          if (allPlayers.areReady()) {
            allPlayers = allPlayers.shuffle();
            let good = players.splice(0, allPlayers.goodPlayerCount());
            let evil = players.splice(0, allPlayers.evilPlayerCount());

            for (let i = 0; i < good.length; i++) {
              good[i].team = "Good";
              good[i].role = "Guard";
            }
            for (let i = 0; i < evil.length; i++) {
              evil[i].team = "Evil";
              evil[i].role = "Minion";
            }

            good[0].role = "Merlin";
            if (good[1] && room.settings.percivalSelected) {
              good[1].role = "Percival"
            }

            evil[0].role = "Assassin";
            if (room.settings.morganaSelected) {
              for (let i = 0; i < evil.length; i++) {
                if (evil[i].role === "Minion") {
                  evil[i].role = "Morgana"
                  break;
                }
              }
            }
            if (room.settings.oberonSelected) {
              for (let i = 0; i < evil.length; i++) {
                if (evil[i].role === "Minion") {
                  evil[i].role = "Oberon"
                  break;
                }
              }
            }

            let assignedPlayers = [];
            for (let i = 0; i < good.length; i++) {
              assignedPlayers.push(good[i]);
            }
            for (let i = 0; i < evil.length; i++) {
              assignedPlayers.push(evil[i]);
            }

            for (let i = 0; i < assignedPlayers.length; i++) {
              assignedPlayers[i].ready = false;
              redis.putObject(assignedPlayers[i].id, assignedPlayers[i]);
              io.to(assignedPlayers[i].id).emit('reveal-started', assignedPlayers[i]);
            }
            redis.getObjects(room.playerIds, (players) => {
              for (let i = 0; i < players.length; i++) {
                delete players[i].team;
                delete players[i].role;
              }
              io.in(roomId).emit('room-updated', { players: players, ownerId: room.ownerId, settings: room.settings, game: room.game, screen: room.screen });
            });
          }
        });
      }
    }, () => { });
  },
  startGame: function (redis, io, roomId) {
    redis.getObject(roomId, (room) => {
      if (room) {
        // Update room's screen
        room.screen = "game"
        redis.putObject(roomId, room);
        redis.getObjects(room.playerIds, (players) => {
          let allPlayers = new AllPlayers(players);
          allPlayers.resetReadyStatuses().storeIn(redis);
          for (let i = 0; i < players.length; i++) {
            delete players[i].team;
            delete players[i].role;
          }
          io.in(roomId).emit('room-updated', { players: players, ownerId: room.ownerId, settings: room.settings, game: room.game, screen: room.screen });
        }, () => { });
      }
    }, () => { });
  },
  proposeQuestMembers: function (redis, io, playerId, roomId, memberIds) {
    console.log(memberIds);
    redis.getObject(roomId, (room) => {
      console.log(room);
      if (room && room.game.activeQuest.organiser == playerId) {
        room.game.activeQuest.proposedMembers = memberIds.splice(0, memberIds.length);
        room.game.state = "questProposal";
        redis.putObject(roomId, room);
        this.sendRoomInformationToAll(redis, io, room, roomId);
      }
    });
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