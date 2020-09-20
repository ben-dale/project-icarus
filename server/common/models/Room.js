class Room {

  // Need to be implemented by child classes
  constructor() {
    this.minPlayers = 100;
    this.maxPlayers = 100;
  }

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
    return this.playerIds.length >= this.minPlayers && this.playerIds.length <= this.maxPlayers;
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