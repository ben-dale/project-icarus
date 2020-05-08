class Player {

  init(id, name, roomId) {
    this.id = id;
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.roomId = roomId;
    this.vote = '';
    this.ready = false;
    this.team = '';
    this.role = '';
    return this;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.roomId = obj.roomId;
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
    copy.roomId = this.roomId;
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

  withTeam(team) {
    const copy = this.copy();
    copy.team = team;
    return copy;
  }

  withRole(role) {
    const copy = this.copy();
    copy.role = role;
    return copy;
  }

  withProposalApproved(proposalApproved) {
    const copy = this.copy();
    copy.vote = proposalApproved ? 'APPROVE' : 'REJECT';
    return copy;
  }

  withSucceedQuest(succeedQuest) {
    const copy = this.copy();
    copy.vote = succeedQuest ? 'SUCCEED' : (copy.team == 'EVIL' ? 'SABOTAGE' : 'SUCCEED');
    return copy;
  }

  clearVote() {
    const copy = this.copy();
    copy.vote = '';
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

  emitToAll(io) {
    const copy = this.copy();
    delete copy.team;
    delete copy.role;
    delete copy.vote;
    delete copy.roomId;
    io.in(this.roomId).emit('player-updated', copy);
  }

  emitToPlayer(io, metadata) {
    const copy = this.copy();
    copy.metadata = metadata;
    delete copy.roomId;
    delete copy.vote;
    io.to(this.id).emit('player-assigned', copy);
  }

}

module.exports = Player;