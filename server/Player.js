class Player {

  init(id, name) {
    this.id = id;
    this.name = name;
    this.vote = '';
    this.ready = false;
    this.team = '';
    this.role = '';
    return this;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.vote = obj.vote;
    this.ready = obj.ready;
    this.team = obj.team;
    this.role = obj.role;
    return this;
  }

  copy() {
    const copy = new Player();
    copy.id = this.id;
    copy.name = this.name;
    copy.vote = this.vote;
    copy.ready = this.ready;
    copy.team = this.team;
    copy.role = this.role;
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

  emitToAll(io, roomId) {
    const copy = this.copy();
    delete copy.team;
    delete copy.role;
    delete copy.vote;
    io.in(roomId).emit('player-updated', copy);
  }

  emitToAllWithVote(io, roomId) {
    const copy = this.copy();
    delete copy.team;
    delete copy.role;
    io.in(roomId).emit('player-updated', copy);
  }

  emitToAllWithTeamAndRole(io, roomId) {
    const copy = this.copy();
    delete copy.vote;
    io.in(roomId).emit('player-updated', copy);
  }

}

module.exports = Player;