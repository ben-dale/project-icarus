class RestartQuest {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_PROPOSING';
    const indexOfCurrentOrganiser = allPlayers.players.map(p => p.id).indexOf(this.avalon.currentQuest.organiserId);
    const indexOfNextOrganiser = (indexOfCurrentOrganiser == (allPlayers.players.length - 1) ? 0 : indexOfCurrentOrganiser + 1);
    const nextOrganiser = allPlayers.players[indexOfNextOrganiser];
    const indexOfCurrentQuestLog = this.avalon.questLogs.map(ql => ql.id).indexOf(this.avalon.currentQuest.id);

    this.avalon.questLogs[indexOfCurrentQuestLog].organiserId = nextOrganiser.id;
    this.avalon.currentQuest = this.avalon.currentQuest.restartQuest(nextOrganiser.id);
    if (this.avalon.currentQuest.disagreements >= 5) {
      this.avalon.screen = 'GAME';
      this.avalon.state = 'GAME_OVER';
      this.avalon.result = 'EVIL';
    }
    allPlayers.resetReadyStatuses().resetVotes().storeInRedis(redisClient).emitToAll(io, roomId);
  }
}

module.exports = RestartQuest;