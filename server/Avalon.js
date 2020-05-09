const CurrentQuest = require('./CurrentQuest');
const QuestLog = require('./QuestLog');
const Settings = require('./Settings');
const RoleReveal = require('./avalon/RoleReveal');
const QuestResultReveal = require('./avalon/QuestResultReveal');
const NextQuest = require('./avalon/NextQuest');
const RestartQuest = require('./avalon/RestartQuest');
const ProposalResult = require('./avalon/ProposalResult');
const ProposalVote = require('./avalon/ProposalVote');
const QuestProposing = require('./avalon/QuestProposing');
const QuestStarting = require('./avalon/QuestStarting');

class Avalon {

  constructor() {
    this.minPlayers = 5;
    this.maxPlayers = 10;
  }

  fromRawObject(obj) {
    this.questLogs = obj.questLogs.map(ql => new QuestLog().fromRawObject(ql));
    this.settings = new Settings().fromRawObject(obj.settings);
    this.currentQuest = new CurrentQuest().fromRawObject(obj.currentQuest);
    this.screen = obj.screen;
    this.state = obj.state;
    this.closed = obj.closed;
    this.minPlayers = obj.minPlayers;
    this.maxPlayers = obj.maxPlayers;
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
    avalon.minPlayers = this.minPlayers;
    avalon.maxPlayers = this.maxPlayers;
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

  next(redisClient, io, allPlayers, roomId) {
    if ((this.screen == 'LOBBY' || (this.screen == 'GAME' && this.state == 'GAME_OVER')) && allPlayers.players.length >= this.minPlayers && allPlayers.players.length <= this.maxPlayers) {
      console.log('starting role reveal...');
      new RoleReveal(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'ROLE_REVEAL') {
      console.log('starting game...');
      new QuestProposing(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSING' && this.currentQuest.proposedPlayerIds.length == this.currentQuest.requiredPlayers) {
      // check that the proposal is valid (no duplicates, of length required and the player ids are players in the room)
      // maybe this could be ProposalVote.canStart(blah)...
      console.log('starting proposal vote...');
      return new ProposalVote(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL') {
      console.log('starting proposal result...');
      new ProposalResult(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && this.currentQuest.proposalAccepted) {
      console.log('starting quest...');
      new QuestStarting(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && !this.currentQuest.proposalAccepted) {
      console.log('restarting quest...');
      new RestartQuest(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_STARTED' && allPlayers.players.filter(p => this.currentQuest.proposedPlayerIds.includes(p.id)).filter(p => p.vote != '').length == this.currentQuest.requiredPlayers) {
      console.log('starting quest result reveal...');
      new QuestResultReveal(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_RESULT_REVEAL' && this.currentQuest.votes.filter(v => v.revealed).length == this.currentQuest.votes.length) {
      console.log('starting next quest...');
      new NextQuest(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'MERLIN_ID' && this.currentQuest.proposedPlayerIds.length == 1) {
      if (allPlayers.players.find(p => p.role == 'MERLIN' && p.id == this.currentQuest.proposedPlayerIds[0])) {
        this.screen = 'GAME';
        this.state = 'GAME_OVER';
        this.result = 'EVIL';
      } else {
        this.screen = 'GAME';
        this.state = 'GAME_OVER';
        this.result = 'GOOD';
      }
      const updatedAllPlayers = allPlayers.resetReadyStatuses();
      updatedAllPlayers.storeInRedis(redisClient);
      updatedAllPlayers.emitToAllWithTeamAndRole(io, roomId);
    }
  }

  revealVote(index) {
    this.currentQuest = this.currentQuest.revealVote(index);
    if (this.currentQuest.allVotesRevealed()) {
      this.currentQuest = this.currentQuest.withResult();
      const indexOfCurrentQuestLog = this.questLogs.map(ql => ql.id).indexOf(this.currentQuest.id);
      this.questLogs[indexOfCurrentQuestLog].result = this.currentQuest.result;
    }
  }

}

module.exports = Avalon;