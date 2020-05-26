class Room {

  // Need to be implemented by child classes
  init(id) { }
  copy() { }
  fromRawObject(obj) { }
  reconnectPlayer(oldPlayerId, newPlayerId) { }
  getFromRedis(redisClient, id, onSuccess, onError) { }

  addPlayerId(playerId) {
    const copy = this.copy();
    copy.playerIds.push(playerId);
    if (copy.ownerId == '') {
      copy.ownerId = playerId;
    }
    return copy;
  }

  disconnectActivePlayer(playerId) {
    const copy = this.copy();
    copy.disconnectedPlayerIds.push(playerId);
    return copy;
  }

  disconnectPlayer(playerId) {
    const copy = this.copy();
    copy.playerIds = this.playerIds.filter(pid => pid !== playerId);
    if (copy.ownerId == playerId && copy.playerIds.length > 0) {
      copy.ownerId = copy.playerIds[0];
    } else if (copy.playerIds.length == 0) {
      copy.ownerId = '';
    }
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

  emitToAll(io) {
    io.in(this.id).emit('room-updated', this);
  }

}

module.exports = Room;