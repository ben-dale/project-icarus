
const AvalonRules = require('../models/AvalonRules');
const QuestLog = require('../models/QuestLog');
const CurrentQuest = require('../models/CurrentQuest');

class RoleReveal {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId) {
    const avalonRules = new AvalonRules(allPlayers.players.length);
    let questLogs = [];
    for (let i = 0; i < 5; i++) {
      questLogs.push(new QuestLog().init(i + 1, avalonRules.numberOfPlayersRequiredForQuest(i)));
    }
    this.avalon.questLogs = questLogs;
    this.avalon.currentQuest = new CurrentQuest().init(allPlayers.selectPlayerAtRandom().id).withRequiredPlayers(avalonRules.numberOfPlayersRequiredForQuest(0));
    this.avalon.closed = true;
    this.avalon.screen = 'ROLE_REVEAL';
    this.avalon.state = '';

    this.avalon.questLogs[0] = this.avalon.questLogs[0].withOrganiserId(this.avalon.currentQuest.organiserId);

    const totalPlayerCount = allPlayers.count();
    const updatedAllPlayers = allPlayers.shuffle().resetReadyStatuses();
    const goodPlayerCount = avalonRules.numberOfGoodPlayers();
    for (let i = 0; i < goodPlayerCount; i++) {
      updatedAllPlayers.players[i] = updatedAllPlayers.players[i].withTeam('GOOD').withRole('GUARD');
    }
    for (let i = goodPlayerCount; i < totalPlayerCount; i++) {
      updatedAllPlayers.players[i] = updatedAllPlayers.players[i].withTeam('EVIL').withRole('MINION');
    }

    updatedAllPlayers.players[0] = updatedAllPlayers.players[0].withRole('MERLIN');
    if (this.avalon.settings.percivalEnabled) {
      updatedAllPlayers.players[1] = updatedAllPlayers.players[1].withRole('PERCIVAL');
    }

    updatedAllPlayers.players[goodPlayerCount] = updatedAllPlayers.players[goodPlayerCount].withRole('ASSASSIN');

    if (this.avalon.settings.morganaEnabled && !this.avalon.settings.oberonEnabled) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] = updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('MORGANA');
    }

    if (this.avalon.settings.oberonEnabled && !this.avalon.settings.morganaEnabled) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] = updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('OBERON');
    }

    if (this.avalon.settings.oberonEnabled && this.avalon.settings.morganaEnabled && totalPlayerCount >= 7) {
      updatedAllPlayers.players[updatedAllPlayers.players.length - 1] = updatedAllPlayers.players[updatedAllPlayers.players.length - 1].withRole('MORGANA');
      updatedAllPlayers.players[updatedAllPlayers.players.length - 2] = updatedAllPlayers.players[updatedAllPlayers.players.length - 2].withRole('OBERON');
    }

    // evil player information to send to certain players
    const evilPlayerIds = updatedAllPlayers.players.filter(p => p.team == 'EVIL').map(p => p.id);
    const evilPlayerIdsWithoutOberon = updatedAllPlayers.players.filter(p => p.team == 'EVIL' && p.role != 'OBERON').map(p => p.id);

    // ids of merlins for percival
    const merlinIds = updatedAllPlayers.players.filter(p => p.role == 'MORGANA' || p.role == 'MERLIN').map(p => p.id);

    // Store roles and team information for each player in Redis
    updatedAllPlayers.storeInRedis(redisClient);

    allPlayers.resetReadyStatuses().emitToAll(io, roomId);
    updatedAllPlayers.players.forEach(p => {
      if (p.role == 'MERLIN' || p.role == 'OBERON') {
        p.emitToPlayer(io, evilPlayerIds);
      } else if (p.team == 'EVIL') {
        p.emitToPlayer(io, evilPlayerIdsWithoutOberon);
      } else if (p.role == 'PERCIVAL') {
        p.emitToPlayer(io, merlinIds);
      } else {
        p.emitToPlayer(io, []);
      }
    });
  }
}

module.exports = RoleReveal;