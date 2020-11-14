const CurrentQuest = require('./CurrentQuest');
const QuestLog = require('./QuestLog');
const Settings = require('./Settings');
const RoleReveal = require('../states/RoleReveal');
const QuestResultReveal = require('../states/QuestResultReveal');
const NextQuest = require('../states/NextQuest');
const RestartQuest = require('../states/RestartQuest');
const ProposalResult = require('../states/ProposalResult');
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
  next(redisClient, io, allPlayers, roomId) {
    if ((this.screen == 'LOBBY' || (this.screen == 'GAME' && this.state == 'GAME_OVER'))) {
      console.log('starting role reveal...');
      new RoleReveal(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'ROLE_REVEAL') {
      console.log('starting game...');
      new BasicState(this, 'GAME', 'QUEST_PROPOSING').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSING' && this.currentQuest.proposedPlayerIds.length == this.currentQuest.requiredPlayers) {
      console.log('starting proposal vote...');
      new BasicState(this, 'GAME', 'QUEST_PROPOSAL').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL') {
      console.log('starting proposal result...');
      new ProposalResult(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && this.currentQuest.proposalAccepted) {
      console.log('starting quest...');
      new BasicState(this, 'GAME', 'QUEST_STARTED').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && !this.currentQuest.proposalAccepted) {
      console.log('restarting quest...');
      new RestartQuest(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_STARTED' && this.allPlayersHaveVotedOnQuestResult(allPlayers)) {
      console.log('starting quest result reveal...');
      new QuestResultReveal(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_RESULT_REVEAL' && this.allQuestVotesAreRevealed()) {
      console.log('starting next quest...');
      new NextQuest(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'MERLIN_ID' && this.currentQuest.proposedPlayerIds.length == 1) {
      console.log('starting game over...');
      if (allPlayers.players.find(p => p.role == 'MERLIN' && p.id == this.currentQuest.proposedPlayerIds[0])) {
        new BasicState(this, 'GAME', 'GAME_OVER').withResult('EVIL');
      } else {
        new BasicState(this, 'GAME', 'GAME_OVER').withResult('GOOD');
      }
      allPlayers.resetReadyStatuses().storeInRedis(redisClient).emitToAllWithTeamAndRole(io, roomId);
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