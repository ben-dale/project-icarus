class Player {

  storeInRedis(redisClient) {
    redisClient.set(this.id, JSON.stringify(this));
    redisClient.expire(this.id, 43200); // Expires after 12 hours
  }

  withReady(ready) {
    const copy = this.copy();
    copy.ready = ready;
    return copy;
  }

}

module.exports = Player;