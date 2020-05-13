const Avalon = require('../../avalon/Avalon');

class Room {

  init(id) {
    this.id = id;
    this.ownerId = '';
    this.playerIds = [];
    this.game = new Avalon().init();
    return this;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.ownerId = obj.ownerId;
    this.playerIds = obj.playerIds.slice();
    this.game = new Avalon().fromRawObject(obj.game);
    return this;
  }

  copy() {
    const copy = new Room();
    copy.id = this.id;
    copy.ownerId = this.ownerId;
    copy.playerIds = this.playerIds.slice();
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

  hasEnoughPlayers() {
    return this.playerIds.length >= this.game.minPlayers;
  }

  hasPlayerId(playerId) {
    return this.playerIds.filter(pid => pid == playerId).length != 0;
  }

  storeInRedis(redisClient) {
    redisClient.set(this.id, JSON.stringify(this));
    redisClient.expire(this.id, 86400);
  }

  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error) {
        onError();
      } else {
        onSuccess(new Room().fromRawObject(JSON.parse(result)));
      }
    });
  }

  emitToAll(io) {
    io.in(this.id).emit('room-updated', this);
  }

}

module.exports = Room;