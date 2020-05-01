const Player = require('./Player');

class AllPlayers {

  init(players) {
    this.players = players.map(p => p.copy());
    return this;
  }

  areReady() {
    return this.players.filter(p => !p.ready).length == 0;
  }

  resetReadyStatuses() {
    let alteredPlayers = this.players.map(p => p.withReady(false));
    return new AllPlayers(alteredPlayers);
  }

  storeInRedis(redisClient) {
    this.players.forEach(p => p.storeInRedis(redisClient));
  }

  getFromRedis(redisClient, ids, onSuccess, onError) {
    redisClient.mget(ids, (error, resultSet) => {
      if (error) {
        onError();
      } else {
        const players = [];
        for (let i = 0; i < resultSet.length; i++) {
          players.push(new Player().fromRawObject(JSON.parse(resultSet[i])))
        }
        onSuccess(new AllPlayers().init(players));
      }
    });
  }
}

module.exports = AllPlayers;