const RandomInteger = require('./RandomInteger');
const AllPlayers = require('./AllPlayers');

module.exports = {
  initGame: function (redis, io, roomId) {
    redis.getObject(roomId, (room) => {
      if (room && room.players.length >= 5) {
        room.closed = true;
        room.screen = "roleReveal";
        room.game = this.generateNewGameObject(room);
        redis.putObject(roomId, room);

        redis.getObjects(room.players, (players) => {
          const allPlayers = AllPlayers(players);
          if (allPlayers.areReady()) {
            this.shuffle(players);
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
            this.shuffle(assignedPlayers); // Shuffle again for the heck of it

            for (let i = 0; i < assignedPlayers.length; i++) {
              assignedPlayers[i].ready = false;
              redis.putObject(assignedPlayers[i].id, assignedPlayers[i]);
              io.to(assignedPlayers[i].id).emit('reveal-started', assignedPlayers[i]);
            }
            redis.getObjects(room.players, (players) => {
              for (let i = 0; i < players.length; i++) {
                delete players[i].team;
                delete players[i].role;
              }
              io.in(roomId).emit('room-updated', { players: players, owner: room.owner, settings: room.settings, game: room.game, screen: room.screen });
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
        this.unreadyPlayers(redis, room.players, () => {
          // Get players, strip out sensitive fields and send room update
          redis.getObjects(room.players, (players) => {
            for (let i = 0; i < players.length; i++) {
              delete players[i].team;
              delete players[i].role;
            }
            io.in(roomId).emit('room-updated', { players: players, owner: room.owner, settings: room.settings, game: room.game, screen: room.screen });
          });
        });
      }
    }, () => { });
  },
  unreadyPlayers: function (redis, playerIds, onSuccess) {
    redis.getObjects(playerIds, (players) => {
      for (let i = 0; i < players.length; i++) {
        players[i].ready = false;
        redis.putObject(players[i].id, players[i]);
      }
      onSuccess();
    }, () => { });
  },
  shuffle: function (a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  allPlayersReady: function (players) {
    for (let i = 0; i < players.length; i++) {
      if (!players[i].ready) {
        return false;
      }
    }
    return true;
  },
  generateNewGameObject: function (room) {
    const questConfigurations = {
      5: [2, 3, 2, 3, 3],
      6: [2, 3, 4, 3, 4],
      7: [2, 3, 4, 3, 4],
      8: [3, 4, 4, 5, 5],
      9: [3, 4, 4, 5, 5],
      10: [3, 4, 4, 5, 5]
    }

    let logs = [];
    let questConfig = questConfigurations[room.players.length];
    for (let i = 0; i < 5; i++) {
      let playersRequired = questConfig[i];
      let questMembers = [];
      for (let j = 0; j < playersRequired; j++) {
        questMembers.push("");
      }
      logs.push({ id: i + 1, requiresDoubleFail: false, required: playersRequired, organiser: "", members: questMembers, result: "" });
    }

    let activeQuest = {
      id: 1,
      disagreements: 0,
      organiser: room.players[new RandomInteger().between(0, room.players.length - 1)].id,
      proposedMembers: [],
      proposalAccepted: false,
      requiresDoubleFail: false,
      results: [],
      result: ""
    }

    return {
      questLog: { logs: logs },
      activeQuest: activeQuest,
      state: "questProposing"
    }
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
    redis.getObjects(room.players, (players) => {
      for (let i = 0; i < players.length; i++) {
        delete players[i].team;
        delete players[i].role;
      }
      io.in(roomId).emit('room-updated', { players: players, owner: room.owner, settings: room.settings, game: room.game, screen: room.screen });
    });
  }
}