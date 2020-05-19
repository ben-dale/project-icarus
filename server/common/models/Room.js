const Avalon = require('../../avalon/Avalon');

class Room {

  init(id) {
    this.id = id;
    this.ownerId = '';
    this.playerIds = [];
    this.disconnectedPlayerIds = [];
    this.game = new Avalon().init();
    return this;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.ownerId = obj.ownerId;
    this.playerIds = obj.playerIds.slice();
    this.disconnectedPlayerIds = obj.disconnectedPlayerIds.slice();
    this.game = new Avalon().fromRawObject(obj.game);
    return this;
  }

  copy() {
    const copy = new Room();
    copy.id = this.id;
    copy.ownerId = this.ownerId;
    copy.playerIds = this.playerIds.slice();
    copy.disconnectedPlayerIds = this.disconnectedPlayerIds.slice();
    copy.game = this.game.copy();
    return copy;
  }

  addPlayerId(playerId) {
    const copy = this.copy();
    copy.playerIds.push(playerId);
    if (copy.ownerId == '') {
      copy.ownerId = playerId;
    }
    return copy;
  }

  withActiveDisconnectedPlayer(playerId) {
    const copy = this.copy();
    copy.disconnectedPlayerIds.push(playerId);
    return copy;
  }

  disconnectPlayer(playerId) {
    const copy = this.copy();
    copy.playerIds = this.playerIds.filter(pid => pid !== playerId);
    if (copy.ownerId == playerId && copy.playerIds.length > 0) {
      copy.ownerId = copy.playerIds[0];
    }
    return copy;
  }

  reconnectPlayer(oldPlayerId, newPlayerId) {
    const copy = this.copy();
    copy.ownerId = this.ownerId == oldPlayerId ? newPlayerId : this.ownerId;
    copy.playerIds = this.playerIds.map(pid => pid == oldPlayerId ? newPlayerId : pid);
    copy.disconnectedPlayerIds = this.disconnectedPlayerIds.filter(pid => pid != oldPlayerId);
    if (copy.game.currentQuest.organiserId == oldPlayerId) {
      copy.game.currentQuest.organiserId = newPlayerId;
    }
    copy.game.currentQuest.proposedPlayerIds = copy.game.currentQuest.proposedPlayerIds.map(pid => pid == oldPlayerId ? newPlayerId : pid);
    copy.game.questLogs.forEach(ql => {
      ql.playerIds = ql.playerIds.map(pid => pid == oldPlayerId ? newPlayerId : pid);
      if (ql.organiserId == oldPlayerId) {
        ql.organiserId = newPlayerId;
      }
    });
    return copy;
  }

  hasEnoughPlayers() {
    return this.playerIds.length >= this.game.minPlayers;
  }

  hasPlayerId(playerId) {
    return this.playerIds.filter(pid => pid == playerId).length != 0;
  }

  storeInRedis(redisClient) {
    redisClient.set(this.id, JSON.stringify(this));
    redisClient.expire(this.id, 43200); // Expires after 12 hours
  }

  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error) {
        onError();
      } else if (result) {
        onSuccess(new Room().fromRawObject(JSON.parse(result)));
      }
    });
  }

  emitToAll(io) {
    io.in(this.id).emit('room-updated', this);
  }

}

module.exports = Room;