module.exports = {

  startGame: function (redis, socket, io, roomId) {
    redis.getObject(roomId, (room) => {
      if (socket.id === room.owner && room.players.length >= 5) {
        room.closed = true;
        redis.putObject(roomId, room);

        var teamConfigurations = {
          5: {
            goodCount: 3,
            evilCount: 2
          },
          6: {
            goodCount: 4,
            evilCount: 2
          },
          7: {
            goodCount: 4,
            evilCount: 3
          },
          8: {
            goodCount: 5,
            evilCount: 3
          },
          9: {
            goodCount: 6,
            evilCount: 3
          },
          10: {
            goodCount: 6,
            evilCount: 4
          }
        }

        redis.getObjects(room.players, (players) => {
          if (this.allPlayersReady) {
            this.shuffle(players);
            let teamConfig = teamConfigurations[players.length];
            let good = players.splice(0, teamConfig.goodCount);
            let evil = players.splice(0, teamConfig.evilCount);

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
          }
        });
      }
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
  }


}