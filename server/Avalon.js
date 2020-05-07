const RandomInteger = require('./RandomInteger');
const CurrentQuest = require('./CurrentQuest');
const QuestLog = require('./QuestLog');
const Settings = require('./Settings');

class Avalon {

  constructor() {
    this.minPlayers = 5;
    this.maxPlayers = 10;
  }

  // PUBLIC METHODS

  fromRawObject(obj) {
    this.questLogs = obj.questLogs.map(ql => new QuestLog().fromRawObject(ql));
    this.settings = new Settings().fromRawObject(obj.settings);
    this.currentQuest = new CurrentQuest().fromRawObject(obj.currentQuest);
    this.screen = obj.screen;
    this.state = obj.state;
    this.closed = obj.closed;
    this.minPlayers = obj.minPlayers;
    this.maxPlayers = obj.maxPlayers;
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
    return avalon;
  }

  init() {
    this.closed = false;
    this.screen = 'LOBBY';
    this.state = '';
    this.currentQuest = new CurrentQuest().init('');
    this.settings = new Settings().init();
    this.questLogs = [];
    return this;
  }

  next(redisClient, io, allPlayers, roomId) {
    if (this.screen == 'LOBBY' && allPlayers.players.length >= this.minPlayers && allPlayers.players.length <= this.maxPlayers) {
      console.log('starting role reveal...');
      this.startRoleReveal(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'ROLE_REVEAL') {
      console.log('starting game...');
      return this.startGame(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSING' && this.currentQuest.proposedPlayerIds.length == this.currentQuest.requiredPlayers) {
      // check that the proposal is valid (no duplicates, of length required and the player ids are players in the room)
      console.log('starting proposal vote...');
      return this.startProposalVote(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL') {
      console.log('starting proposal result...');
      return this.startProposalResult(redisClient, io, allPlayers, roomId);
    } else if (this.screen == 'GAME' && this.state == 'QUEST_PROPOSAL_RESULT' && this.currentQuest.proposalAccepted) {
      console.log('starting quest...');
    }
  }

  startProposalVote(redisClient, io, allPlayers, roomId) {
    this.screen = 'GAME';
    this.state = 'QUEST_PROPOSAL';

    const updatedAllPlayers = allPlayers.resetReadyStatuses();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);
  }

  startProposalResult(redisClient, io, allPlayers, roomId) {
    this.screen = 'GAME';
    this.state = 'QUEST_PROPOSAL_RESULT';

    const playersThatApproved = allPlayers.players.filter(p => p.vote == 'APPROVE').length;
    const playersThatRejected = allPlayers.players.filter(p => p.vote == 'REJECT').length;
    if (playersThatApproved > playersThatRejected) {
      this.currentQuest.proposalAccepted = true;
      const indexOfCurrentQuestLog = this.questLogs.map(ql => ql.id).indexOf(this.currentQuest.id);
      this.questLogs[indexOfCurrentQuestLog].playerIds = this.currentQuest.proposedPlayerIds.slice(); 
    }

    const updatedAllPlayers = allPlayers.resetReadyStatuses();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAllWithVote(io, roomId);
  }


  // PRIVATE METHODS

  startGame(redisClient, io, allPlayers, roomId) {
    this.screen = 'GAME';
    this.state = 'QUEST_PROPOSING';

    const updatedAllPlayers = allPlayers.resetReadyStatuses();
    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);
  }

  startRoleReveal(redisClient, io, allPlayers, roomId) {
    // Need to move some of this code out to start next round
    let questLogs = [];
    let questConfig = this.playersRequiredEachQuest(allPlayers.players.length);
    for (let i = 0; i < 5; i++) {
      questLogs.push(new QuestLog().init(i + 1, questConfig[i]));
    }
    this.questLogs = questLogs;
    this.currentQuest = new CurrentQuest().init(this.randomPlayerId(allPlayers)).withRequiredPlayers(questConfig[0]);
    this.closed = true;
    this.screen = 'ROLE_REVEAL';
    this.state = '';

    this.questLogs[0] = this.questLogs[0].withOrganiserId(this.currentQuest.organiserId);

    const totalPlayerCount = allPlayers.count();
    const updatedAllPlayers = allPlayers.shuffle().resetReadyStatuses();
    const goodPlayerCount = this.goodPlayerCount(totalPlayerCount);
    for (let i = 0; i < goodPlayerCount; i++) {
      updatedAllPlayers.players[i] = updatedAllPlayers.players[i].withTeam('GOOD').withRole('GUARD');
    }
    for (let i = goodPlayerCount; i < totalPlayerCount; i++) {
      updatedAllPlayers.players[i] = updatedAllPlayers.players[i].withTeam('EVIL').withRole('MINION');
    }

    updatedAllPlayers.players[0] = updatedAllPlayers.players[0].withRole('MERLIN');
    if (this.settings.percivalEnabled) {
      updatedAllPlayers.players[1] = updatedAllPlayers.players[1].withRole('PERCIVAL');
    }

    updatedAllPlayers.players[goodPlayerCount] = updatedAllPlayers.players[goodPlayerCount].withRole('ASSASSIN');

    if (this.settings.morganaEnabled && !this.settings.oberonEnabled) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] = updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('MORGANA');
    }

    if (this.settings.oberonEnabled && !this.settings.morganaEnabled) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] = updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('OBERON');
    }

    if (this.settings.oberonEnabled && this.settings.morganaEnabled && totalPlayerCount >= 7) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] = updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('MORGANA');
      updatedAllPlayers.players[updatedAllPlayers.players.length - 2] = updatedAllPlayers.players[updatedAllPlayers.players.length - 2].withRole('OBERON');
    }

    // evil player information to send to certain players
    const evilPlayerIds = updatedAllPlayers.players.filter(p => p.team == 'EVIL').map(p => p.id);

    // ids of merlins for percival
    const merlinIds = updatedAllPlayers.players.filter(p => p.role == 'MORGANA' || p.role == 'MERLIN').map(p => p.id);

    // Store roles and team information for each player in Redis
    updatedAllPlayers.storeInRedis(redisClient);

    allPlayers.resetReadyStatuses().emitToAll(io, roomId);
    updatedAllPlayers.players.forEach(p => {
      if (p.role == 'MERLIN' || p.team == 'EVIL') {
        p.emitToPlayer(io, evilPlayerIds);
      } else if (p.role == 'PERCIVAL') {
        p.emitToPlayer(io, merlinIds);
      } else {
        p.emitToPlayer(io, []);
      }
    });
  }

  randomPlayerId(allPlayers) {
    const playerIds = allPlayers.players.map(p => p.id);
    return playerIds[new RandomInteger().between(0, playerIds.length - 1)];
  }

  playersRequiredEachQuest(totalPlayers) {
    switch (totalPlayers) {
      case 5: return [2, 3, 2, 3, 3];
      case 6: return [2, 3, 4, 3, 4];
      case 7: return [2, 3, 4, 3, 4];
      case 8: return [3, 4, 4, 5, 5];
      case 9: return [3, 4, 4, 5, 5];
      case 10: return [3, 4, 4, 5, 5];
    }
  }

  goodPlayerCount(totalPlayerCount) {
    switch (totalPlayerCount) {
      case 5: return 3;
      case 6: return 4;
      case 7: return 4;
      case 8: return 5;
      case 9: return 6;
      case 10: return 6;
    }
  }

}

module.exports = Avalon;