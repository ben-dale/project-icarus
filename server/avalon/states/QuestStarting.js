class QuestStarting {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_STARTED';

    const updatedAllPlayers = allPlayers.resetReadyStatuses().resetVotes();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);
  }
}

module.exports = QuestStarting;