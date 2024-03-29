const AvalonPlayer = require('../../avalon/models/AvalonPlayer');
const RandomInteger = require('./RandomInteger')

class AllPlayers {

  init(players) {
    this.players = players.map(p => p.copy());
    return this;
  }

  get(i) {
    return this.players[i];
  }

  set(i, player) {
    this.players[i] = player;
    return this;
  }

  filter(predicate) {
    return this.players.filter(predicate);
  }

  forEach(lambda) {
    this.players.forEach(lambda);
    return this;
  }

  areReady() {
    return this.players.filter(p => !p.ready).length == 0;
  }

  reconnectPlayer(oldPlayerId, newPlayerId) {
    return new AllPlayers().init(this.players.map(p => p.reconnect(oldPlayerId, newPlayerId)));
  }

  resetReadyStatuses() {
    let alteredPlayers = this.players.map(p => p.copy().withReady(false));
    return new AllPlayers().init(alteredPlayers);
  }

  resetVotes() {
    let alteredPlayers = this.players.map(p => p.copy().clearVote());
    return new AllPlayers().init(alteredPlayers);
  }

  storeInRedis(redisClient) {
    this.players.forEach(p => p.storeInRedis(redisClient));
    return this;
  }

  getFromRedis(redisClient, ids, onSuccess, onError) {
    redisClient.mget(ids, (error, resultSet) => {
      if (error) {
        onError();
      } else {
        const players = [];
        for (let i = 0; i < resultSet.length; i++) {
          players.push(new AvalonPlayer().fromRawObject(JSON.parse(resultSet[i])))
        }
        onSuccess(new AllPlayers().init(players));
      }
    });
  }

  emitToAll(io, roomId) {
    this.players.forEach(p => p.emitAssignmentInformation(io));
    const playersToEmit = this.players.map(p => {
      const copy = p.copy();
      delete copy.roomId;
      delete copy.team;
      delete copy.role;
      delete copy.vote;
      delete copy.metadata;
      return copy;
    });
    io.in(roomId).emit('players-updated', playersToEmit);
    return this;
  }

  emitToAllWithVote(io, roomId) {
    const playersToEmit = this.players.map(p => {
      const copy = p.copy();
      delete copy.roomId;
      delete copy.team;
      delete copy.role;
      delete copy.metadata;
      return copy;
    });
    io.in(roomId).emit('players-updated', playersToEmit);
    return this;
  }

  emitToAllWithTeamAndRole(io, roomId) {
    const playersToEmit = this.players.map(p => {
      const copy = p.copy();
      delete copy.roomId;
      delete copy.metadata;
      delete copy.vote;
      return copy;
    });
    io.in(roomId).emit('players-updated', playersToEmit);
    return this;
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

  selectPlayerAtRandom() {
    return this.players[new RandomInteger().between(0, this.players.length - 1)];
  }
}

module.exports = AllPlayers;