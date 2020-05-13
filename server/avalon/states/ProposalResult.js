class ProposalResult {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    this.avalon.screen = 'GAME';
    this.avalon.state = 'QUEST_PROPOSAL_RESULT';

    const playersThatApproved = allPlayers.players.filter(p => p.vote == 'APPROVE').length;
    const playersThatRejected = allPlayers.players.filter(p => p.vote == 'REJECT').length;
    if (playersThatApproved > playersThatRejected) {
      this.avalon.currentQuest.proposalAccepted = true;
      const indexOfCurrentQuestLog = this.avalon.questLogs.map(ql => ql.id).indexOf(this.avalon.currentQuest.id);
      this.avalon.questLogs[indexOfCurrentQuestLog].playerIds = this.avalon.currentQuest.proposedPlayerIds.slice();
    }

    const updatedAllPlayers = allPlayers.resetReadyStatuses();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAllWithVote(io, roomId);
  }
}

module.exports = ProposalResult;