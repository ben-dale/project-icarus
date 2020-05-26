const Room = require('../../common/models/Room');
const Avalon = require('../Avalon');

class AvalonRoom extends Room {
  
  init(id) {
    this.id = id;
    this.ownerId = '';
    this.playerIds = [];
    this.disconnectedPlayerIds = [];
    this.game = new Avalon().init();
    return this;
  }

  copy() {
    const copy = new AvalonRoom();
    copy.id = this.id;
    copy.ownerId = this.ownerId;
    copy.playerIds = this.playerIds.slice();
    copy.disconnectedPlayerIds = this.disconnectedPlayerIds.slice();
    copy.game = this.game.copy();
    return copy;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.ownerId = obj.ownerId;
    this.playerIds = obj.playerIds.slice();
    this.disconnectedPlayerIds = obj.disconnectedPlayerIds.slice();
    this.game = new Avalon().fromRawObject(obj.game);
    return this;
  }

  reconnectPlayer(oldPlayerId, newPlayerId) {
    const copy = this.copy();
    copy.ownerId = this.ownerId == oldPlayerId ? newPlayerId : this.ownerId;
    copy.playerIds = this.playerIds.map(pid => pid == oldPlayerId ? newPlayerId : pid);
    copy.disconnectedPlayerIds = this.disconnectedPlayerIds.filter(pid => pid != oldPlayerId);

    // TODO move game modification parts into Avalon.js
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

  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error || !result) {
        onError();
      } else if (result) {
        onSuccess(new AvalonRoom().fromRawObject(JSON.parse(result)));
      }
    });
  }

}

module.exports = AvalonRoom;