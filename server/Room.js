const Avalon = require('./Avalon');

class Room {

  init(ownerId) {
    this.ownerId = ownerId;
    this.playerIds = [];
    this.game = new Avalon().init();
    return this;
  }

  fromRawObject(obj) {
    const room = new Room();
    room.ownerId = obj.ownerId;
    room.playerIds = obj.playerIds.slice();
    room.game = new Avalon().fromRawObject(obj.game);
    return room;
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