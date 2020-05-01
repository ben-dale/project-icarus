class Player {

  init(id, name) {
    this.id = id;
    this.name = name;
    this.vote = '';
    this.ready = false;
    return this;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.vote = obj.vote;
    this.ready = obj.ready;
    return this;
  }

  copy() {
    const copy = new Player();
    copy.id = this.id;
    copy.name = this.name;
    copy.vote = this.vote;
    copy.ready = this.ready;
    return copy;
  }

  storeInRedis(redisClient) {
    redisClient.set(this.id, JSON.stringify(this));
    redisClient.expire(this.id, 86400);
  }

  withReady(ready) {
    const copy = this.copy();
    copy.ready = ready;
    return copy;
  }

  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error) {
        onError();
      } else {
        onSuccess(new Player().fromRawObject(JSON.parse(result)));
      }
    });
  }

}

module.exports = Player;