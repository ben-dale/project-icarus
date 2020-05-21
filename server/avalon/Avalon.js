const CurrentQuest = require('./models/CurrentQuest');
const QuestLog = require('./models/QuestLog');
const Settings = require('./models/Settings');
const RoleReveal = require('./states/RoleReveal');
const QuestResultReveal = require('./states/QuestResultReveal');
const NextQuest = require('./states/NextQuest');
const RestartQuest = require('./states/RestartQuest');
const ProposalResult = require('./states/ProposalResult');
const BasicState = require('./states/BasicState');

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

  // TODO remove mutation from this and have each block return new instance of Avalon
  next(redisClient, io, allPlayers, roomId) {
    if ((this.screen == 'LOBBY' || (this.screen == 'GAME' && this.state == 'GAME_OVER')) && allPlayers.players.length >= this.minPlayers && allPlayers.players.length <= this.maxPlayers) {
      console.log('starting role reveal...');
      new RoleReveal(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'ROLE_REVEAL') {
      console.log('starting game...');
      new BasicState(this).start(redisClient, io, allPlayers, roomId, 'GAME', 'QUEST_PROPOSING');
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSING' && this.currentQuest.proposedPlayerIds.length == this.currentQuest.requiredPlayers) {
      console.log('starting proposal vote...');
      return new BasicState(this).start(redisClient, io, allPlayers, roomId, 'GAME', 'QUEST_PROPOSAL');
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL') {
      console.log('starting proposal result...');
      new ProposalResult(this).start(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && this.currentQuest.proposalAccepted) {
      console.log('starting quest...');
      new BasicState(this).start(redisClient, io, allPlayers, roomId, 'GAME', 'QUEST_STARTED');
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