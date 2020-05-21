class QuestResultReveal {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_RESULT_REVEAL';

    allPlayers.filter(p => p.vote == 'SABOTAGE').forEach(_ => {
      this.avalon.currentQuest = this.avalon.currentQuest.withSabotageVote();
    });
    allPlayers.filter(p => p.vote == 'SUCCEED').forEach(_ => {
      this.avalon.currentQuest = this.avalon.currentQuest.withSucceedVote();
    });

    this.avalon.currentQuest = this.avalon.currentQuest.shuffleVotes();

    allPlayers.resetReadyStatuses().resetVotes().storeInRedis(redisClient).emitToAll(io, roomId);
  }
}

module.exports = QuestResultReveal;