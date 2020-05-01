const Avalon = require('./Avalon');

class Room {

  init(id, ownerId) {
    this.id = id;
    this.ownerId = ownerId;
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

  storeInRedis(redisClient, id) {
    redisClient.set(id, JSON.stringify(this));
    redisClient.expire(id, 86400);
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


}

module.exports = Room;