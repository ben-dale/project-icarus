const Player = require('../../common/models/Player');

class AvalonPlayer extends Player {

  init(id, name, roomId) {
    this.id = id;
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.roomId = roomId;
    this.vote = '';
    this.ready = false;
    this.team = '';
    this.role = '';
    this.metadata = [];
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
    this.metadata = obj.metadata.slice();
    return this;
  }

  copy() {
    const copy = new AvalonPlayer();
    copy.id = this.id;
    copy.name = this.name;
    copy.roomId = this.roomId;
    copy.vote = this.vote;
    copy.ready = this.ready;
    copy.team = this.team;
    copy.role = this.role;
    copy.metadata = this.metadata.slice();
    return copy;
  }

  reconnect(oldPlayerId, newPlayerId) {
    const copy = this.copy();
    copy.id = this.id == oldPlayerId ? newPlayerId : this.id;
    copy.metadata = this.metadata.slice().map(pid => pid == oldPlayerId ? newPlayerId : pid);
    return copy;
  }

  clearVote() {
    const copy = this.copy();
    copy.vote = '';
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

  withMetadata(metadata) {
    const copy = this.copy();
    copy.metadata = metadata.slice();
    return copy;
  }

  getFromRedis(redisClient, id, onSuccess, onError) {
    redisClient.get(id, (error, result) => {
      if (error || !result) {
        onError();
      } else {
        onSuccess(new AvalonPlayer().fromRawObject(JSON.parse(result)));
      }
    });
  }

  emitToAll(io) {
    const copy = this.copy();
    delete copy.team;
    delete copy.role;
    delete copy.vote;
    delete copy.metadata;
    delete copy.roomId;
    io.in(this.roomId).emit('player-updated', copy);
  }

  // rename to player-updated-full or something
  emitAssignmentInformation(io) {
    const copy = this.copy();
    delete copy.roomId;
    io.to(this.id).emit('player-assigned', copy);
  }

}

module.exports = AvalonPlayer;