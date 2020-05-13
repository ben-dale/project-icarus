class QuestLog {

  init(id, requiredPlayers) {
    this.id = id;
    this.requiredPlayers = requiredPlayers;
    this.organiserId = '';
    this.playerIds = [];
    this.result = '';
    return this;
  }

  fromRawObject(obj) {
    this.id = obj.id;
    this.requiredPlayers = obj.requiredPlayers;
    this.organiserId = obj.organiserId;
    this.playerIds = obj.playerIds.slice();
    this.result = obj.result;
    return this;
  }

  copy() {
    const questLog = new QuestLog();
    questLog.id = this.id;
    questLog.requiredPlayers = this.requiredPlayers;
    questLog.organiserId = this.organiserId;
    questLog.playerIds = this.playerIds.slice();
    questLog.result = this.result;
    return questLog;
  }

  withOrganiserId(organiserId) {
    const copy = this.copy();
    copy.organiserId = organiserId;
    return copy;
  }

  addPlayer(playerId) {
    const copy = this.copy();
    if (copy.playerIds.length < copy.requiredPlayers) {
      copy.playerIds.push(playerId);
    }
    return copy;
  }

  withResult(result) {
    const copy = this.copy();
    copy.result = result;
    return copy;
  }


}

module.exports = QuestLog;