class Room {

  constructor() {
    this.ownerId = "";
    this.playerIds = [];
  }

  fromRawObject(obj) {
    let room = new Room();
    room.ownerId = obj.ownerId;
    room.playerIds = obj.playerIds.slice();
    return room;
  }
  
  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error) {
        onError();
      } else {
        onSuccess(new Room().fromRawObject(result));
      }
    });
  }


}

module.exports = Room;