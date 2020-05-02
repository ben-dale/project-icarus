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
    if (this.screen = 'LOBBY' && allPlayers.players.length >= this.minPlayers && allPlayers.players.length <= this.maxPlayers) {
      this.startRoleReveal(redisClient, io, allPlayers, roomId);
    }

    if (this.screen = 'ROLE_REVEAL') {
      return this.startGame();
    }
    // todo 
    // this.screen = 'GAME'
    // if this.screen == 'GAME' && state == ...
  }


  // PRIVATE METHODS

  startGame() {

  }

  startRoleReveal(redisClient, io, allPlayers, roomId) {
    let questLogs = [];
    let questConfig = this.playersRequiredEachQuest(allPlayers.players.length);
    for (let i = 0; i < 5; i++) {
      questLogs.push(new QuestLog().init(i + 1, questConfig[i]));
    }
    this.questLogs = questLogs;
    this.currentQuest = new CurrentQuest().init(this.randomPlayerId(allPlayers));
    this.closed = true;
    this.screen = 'ROLE_REVEAL';
    this.state = '';

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
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] =  updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('MORGANA');
    }

    if (this.settings.oberonEnabled && !this.settings.morganaEnabled) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] =  updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('OBERON');
    }
      
    if (this.settings.oberonEnabled && this.settings.morganaEnabled && totalPlayerCount >= 7) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] =  updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('MORGANA');
      updatedAllPlayers.players[updatedAllPlayers.players.length - 2] =  updatedAllPlayers.players[updatedAllPlayers.players.length - 2].withRole('OBERON');
    }

    updatedAllPlayers.storeInRedis(redisClient);
    updatedAllPlayers.emitToAll(io, roomId);

    return this;
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

  // todo methods for each game state...
  // startGame
  // startNextRound
  // startQuest
  // startProposalVote
  // handleQuestProposalFailure

  // emit()
  // 

}

module.exports = Avalon;