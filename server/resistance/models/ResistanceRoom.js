const Room = require('../../common/models/Room');

class ResistanceRoom extends Room {

  init(id) {
    this.id = id;
    this.ownerId = '';
    this.playerIds = [];
    this.disconnectedPlayerIds = [];
    // this.game = new Avalon().init();
    return this;
  }

  copy() {
    const copy = new ResistanceRoom();
    copy.id = this.id;
    copy.ownerId = this.ownerId;
    copy.playerIds = this.playerIds.slice();
    copy.disconnectedPlayerIds = this.disconnectedPlayerIds.slice();
    // copy.game = this.game.copy();
    return copy;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.ownerId = obj.ownerId;
    this.playerIds = obj.playerIds.slice();
    this.disconnectedPlayerIds = obj.disconnectedPlayerIds.slice();
    // this.game = new Avalon().fromRawObject(obj.game);
    return this;
  }

  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error || !result) {
        onError();
      } else if (result) {
        onSuccess(new ResistanceRoom().fromRawObject(JSON.parse(result)));
      }
    });
  }

}

module.exports = ResistanceRoom;