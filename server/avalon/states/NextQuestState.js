const AvalonRules = require('../models/AvalonRules');

class NextQuest {

  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    const questFailCount = this.avalon.questLogs.filter(ql => ql.result == 'FAIL').length;
    const questSucceedCount = this.avalon.questLogs.filter(ql => ql.result == 'SUCCEED').length;
    if (questSucceedCount >= 3) {
      this.avalon.screen = 'GAME';
      this.avalon.state = 'MERLIN_ID';
      this.avalon.currentQuest.proposedPlayerIds = [];

      const updatedAllPlayers = allPlayers.resetReadyStatuses().resetVotes();
      updatedAllPlayers.storeInRedis(redisClient);
      updatedAllPlayers.emitToAllWithTeamAndRole(io, roomId);
      return;
    }

    if (questFailCount >= 3) {
      this.avalon.screen = 'GAME';
      this.avalon.state = 'GAME_OVER';
      this.avalon.result = 'EVIL';
      const updatedAllPlayers = allPlayers.resetReadyStatuses().resetVotes();
      updatedAllPlayers.storeInRedis(redisClient);
      updatedAllPlayers.emitToAllWithTeamAndRole(io, roomId);
      return;
    }

    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_PROPOSING';
    const indexOfCurrentOrganiser = allPlayers.players.map(p => p.id).indexOf(this.avalon.currentQuest.organiserId);
    const indexOfNextOrganiser = (indexOfCurrentOrganiser == (allPlayers.players.length - 1) ? 0 : indexOfCurrentOrganiser + 1);
    const nextOrganiser = allPlayers.players[indexOfNextOrganiser];

    const indexOfCurrentQuestLog = this.avalon.questLogs.map(ql => ql.id).indexOf(this.avalon.currentQuest.id);
    if (indexOfCurrentQuestLog < 4) {
      this.avalon.questLogs[indexOfCurrentQuestLog + 1].organiserId = nextOrganiser.id;
    }
    const avalonRules = new AvalonRules(allPlayers.players.length);
    this.avalon.currentQuest = this.avalon.currentQuest.startNextQuest(nextOrganiser.id, avalonRules.numberOfPlayersRequiredForQuest(this.avalon.currentQuest.id));

    const updatedAllPlayers = allPlayers.resetReadyStatuses().resetVotes();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);
  }

}

module.exports = NextQuest;