class QuestProposing {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_PROPOSING';

    const updatedAllPlayers = allPlayers.resetReadyStatuses();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);
  }
}

module.exports = QuestProposing;