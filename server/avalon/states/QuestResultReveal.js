class QuestResultReveal {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_RESULT_REVEAL';

    allPlayers.players.filter(p => p.vote == 'SABOTAGE').forEach(p => {
      this.avalon.currentQuest = this.avalon.currentQuest.withSabotageVote();
    });
    allPlayers.players.filter(p => p.vote == 'SUCCEED').forEach(p => {
      this.avalon.currentQuest = this.avalon.currentQuest.withSucceedVote();
    });

    this.avalon.currentQuest = this.avalon.currentQuest.shuffleVotes();

    const updatedAllPlayers = allPlayers.resetReadyStatuses().resetVotes();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);
  }
}

module.exports = QuestResultReveal;