class QuestProposing {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_PROPOSING';

    allPlayers.resetReadyStatuses().storeInRedis(redisClient).emitToAll(io, roomId);
  }
}

module.exports = QuestProposing;