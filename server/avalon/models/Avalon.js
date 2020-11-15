const CurrentQuest = require('./CurrentQuest');
const QuestLog = require('./QuestLog');
const Settings = require('./Settings');
const RoleRevealState = require('../states/RoleRevealState');
const QuestResultRevealState = require('../states/QuestResultRevealState');
const NextQuestState = require('../states/NextQuestState');
const RestartQuestState = require('../states/RestartQuestState');
const ProposalResultState = require('../states/ProposalResultState');
const BasicState = require('../states/BasicState');

class Avalon {

  fromRawObject(obj) {
    this.questLogs = obj.questLogs.map(ql => new QuestLog().fromRawObject(ql));
    this.settings = new Settings().fromRawObject(obj.settings);
    this.currentQuest = new CurrentQuest().fromRawObject(obj.currentQuest);
    this.screen = obj.screen;
    this.state = obj.state;
    this.closed = obj.closed;
    this.result = obj.result;
    return this;
  }

  copy() {
    const avalon = new Avalon();
    avalon.closed = this.closed;
    avalon.state = this.state;
    avalon.screen = this.screen;
    avalon.currentQuest = this.currentQuest.copy();
    avalon.settings = this.settings.copy();
    avalon.questLogs = this.questLogs.map(ql => ql.copy());
    avalon.result = this.result;
    return avalon;
  }

  init() {
    this.closed = false;
    this.screen = 'LOBBY';
    this.state = '';
    this.currentQuest = new CurrentQuest().init('');
    this.settings = new Settings().init();
    this.questLogs = [];
    this.result = '';
    return this;
  }

  // TODO remove mutation from this and have each block return new instance of Avalon
  // I don't think this should have access to redisClient? Maybe, maybe not.
  next(redisClient, io, allPlayers, roomId) {
    if ((this.screen == 'LOBBY' || (this.screen == 'GAME' && this.state == 'GAME_OVER'))) {
      console.log('starting role reveal...');
      return new RoleRevealState(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'ROLE_REVEAL') {
      console.log('starting game...');
      const copy = this.copy();
      new BasicState(copy, 'GAME', 'QUEST_PROPOSING').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSING' && this.currentQuest.proposedPlayerIds.length == this.currentQuest.requiredPlayers) {
      console.log('starting proposal vote...');
      const copy = this.copy();
      new BasicState(copy, 'GAME', 'QUEST_PROPOSAL').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL') {
      console.log('starting proposal result...');
      const copy = this.copy();
      new ProposalResultState(copy).start(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && this.currentQuest.proposalAccepted) {
      console.log('starting quest...');
      const copy = this.copy();
      new BasicState(copy, 'GAME', 'QUEST_STARTED').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && !this.currentQuest.proposalAccepted) {
      console.log('restarting quest...');
      const copy = this.copy();
      new RestartQuestState(copy).start(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'QUEST_STARTED' && this.allPlayersHaveVotedOnQuestResult(allPlayers)) {
      console.log('starting quest result reveal...');
      const copy = this.copy();
      new QuestResultRevealState(copy).start(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'QUEST_RESULT_REVEAL' && this.allQuestVotesAreRevealed()) {
      console.log('starting next quest...');
      const copy = this.copy();
      new NextQuestState(copy).start(redisClient, io, allPlayers, roomId);
      return copy;
    } else if (this.screen == 'GAME' && this.state == 'MERLIN_ID' && this.currentQuest.proposedPlayerIds.length == 1) {
      console.log('starting game over...');
      const copy = this.copy();
      if (allPlayers.players.find(p => p.role == 'MERLIN' && p.id == this.currentQuest.proposedPlayerIds[0])) {
        new BasicState(copy, 'GAME', 'GAME_OVER').withResult('EVIL');
      } else {
        new BasicState(copy, 'GAME', 'GAME_OVER').withResult('GOOD');
      }
      allPlayers.resetReadyStatuses().storeInRedis(redisClient).emitToAllWithTeamAndRole(io, roomId);
      return copy;
    }
  }

  revealVote(index) {
    const copy = this.copy();
    copy.currentQuest = copy.currentQuest.revealVote(index);
    if (copy.currentQuest.allVotesRevealed()) {
      copy.currentQuest = copy.currentQuest.withResult();
      const indexOfCurrentQuestLog = copy.questLogs.map(ql => ql.id).indexOf(copy.currentQuest.id);
      copy.questLogs[indexOfCurrentQuestLog].result = copy.currentQuest.result;
    }
    return copy;
  }

  allQuestVotesAreRevealed() {
    return this.currentQuest.votes.filter(v => v.revealed).length == this.currentQuest.votes.length;
  }

  allPlayersHaveVotedOnQuestResult(allPlayers) {
    return allPlayers.players.filter(p => this.currentQuest.proposedPlayerIds.includes(p.id)).filter(p => p.vote != '').length == this.currentQuest.requiredPlayers
  }

}

module.exports = Avalon;