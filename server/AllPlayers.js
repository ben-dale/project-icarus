const Player = require('./Player');

class AllPlayers {

  init(players) {
    this.players = players.map(p => p.copy());
    return this;
  }

  areReady() {
    return this.players.filter(p => !p.ready).length == 0;
  }

  resetReadyStatuses() {
    let alteredPlayers = this.players.map(p => p.withReady(false));
    return new AllPlayers().init(alteredPlayers);
  }

  storeInRedis(redisClient) {
    this.players.forEach(p => p.storeInRedis(redisClient));
  }

  getFromRedis(redisClient, ids, onSuccess, onError) {
    redisClient.mget(ids, (error, resultSet) => {
      if (error) {
        onError();
      } else {
        const players = [];
        for (let i = 0; i < resultSet.length; i++) {
          players.push(new Player().fromRawObject(JSON.parse(resultSet[i])))
        }
        onSuccess(new AllPlayers().init(players));
      }
    });
  }

  emitToAll(io, roomId) {
    const playersToEmit = this.players.map(p => {
      delete p.roomId;
      delete p.team;
      delete p.role;
      delete p.vote;
      return p;
    });
    io.in(roomId).emit('players-updated', playersToEmit);
  }

  emitToAllWithVote(io, roomId) {
    const playersToEmit = this.players.map(p => {
      delete p.roomId;
      delete p.team;
      delete p.role;
      return p;
    });
    io.in(roomId).emit('players-updated', playersToEmit);
  }

  emitToAllWithTeamAndRole(io, roomId) {
    const playersToEmit = this.players.map(p => {
      delete p.roomId;
      delete p.vote;
      return p;
    });
    io.in(roomId).emit('players-updated', playersToEmit);
  }

  shuffle() {
    const copyOfPlayers = this.players.map(p => p.copy());
    for (let i = copyOfPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyOfPlayers[i], copyOfPlayers[j]] = [copyOfPlayers[j], copyOfPlayers[i]];
    }
    return new AllPlayers().init(copyOfPlayers);
  }

  count() {
    return this.players.length;
  }
}

module.exports = AllPlayers;