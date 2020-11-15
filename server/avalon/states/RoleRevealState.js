
const AvalonRules = require('../models/AvalonRules');
const QuestLog = require('../models/QuestLog');
const CurrentQuest = require('../models/CurrentQuest');

class RoleReveal {
  constructor(avalon) {
    this.avalon = avalon.copy();
  }

  start(redisClient, io, allPlayers, roomId) {
    const totalPlayerCount = allPlayers.count();
    const avalonRules = new AvalonRules(totalPlayerCount);
    const goodPlayerCount = avalonRules.numberOfGoodPlayers();

    const questLogs = [];
    for (let i = 0; i < 5; i++) {
      questLogs.push(new QuestLog().init(i + 1, avalonRules.numberOfPlayersRequiredForQuest(i)));
    }
    this.avalon.questLogs = questLogs;
    this.avalon.currentQuest = new CurrentQuest().init(allPlayers.selectPlayerAtRandom().id).withRequiredPlayers(avalonRules.numberOfPlayersRequiredForQuest(0));
    this.avalon.closed = true;
    this.avalon.screen = 'ROLE_REVEAL';
    this.avalon.state = '';

    this.avalon.questLogs[0] = this.avalon.questLogs[0].withOrganiserId(this.avalon.currentQuest.organiserId);

    const updatedAllPlayers = allPlayers.shuffle().resetReadyStatuses();

    for (let i = 0; i < goodPlayerCount; i++) {
      updatedAllPlayers.set(i, updatedAllPlayers.get(i).withTeam('GOOD').withRole('GUARD'));
    }
    for (let i = goodPlayerCount; i < totalPlayerCount; i++) {
      updatedAllPlayers.set(i, updatedAllPlayers.get(i).withTeam('EVIL').withRole('MINION'));
    }

    updatedAllPlayers.set(0, updatedAllPlayers.get(0).withRole('MERLIN'));
    if (this.avalon.settings.percivalEnabled) {
      updatedAllPlayers.set(1, updatedAllPlayers.get(1).withRole('PERCIVAL'));
    }

    updatedAllPlayers.set(goodPlayerCount, updatedAllPlayers.get(goodPlayerCount).withRole('ASSASSIN'));

    if (this.avalon.settings.morganaEnabled && !this.avalon.settings.oberonEnabled) {
      const index = totalPlayerCount - 1;
      updatedAllPlayers.set(index, updatedAllPlayers.get(index).withRole('MORGANA'));
    }

    if (this.avalon.settings.oberonEnabled && !this.avalon.settings.morganaEnabled) {
      const index = totalPlayerCount - 1
      updatedAllPlayers.set(index, updatedAllPlayers.get(index).withRole('OBERON'));
    }

    if (this.avalon.settings.oberonEnabled && this.avalon.settings.morganaEnabled && totalPlayerCount >= 7) {
      const morganaIndex = totalPlayerCount - 1;
      const oberonIndex = totalPlayerCount - 2;
      updatedAllPlayers.set(morganaIndex, updatedAllPlayers.get(morganaIndex).withRole('MORGANA'));
      updatedAllPlayers.set(oberonIndex, updatedAllPlayers.get(oberonIndex).withRole('OBERON'));
    }

    // evil player information to send to certain players
    const evilPlayerIds = updatedAllPlayers.filter(p => p.team == 'EVIL').map(p => p.id);
    const evilPlayerIdsWithoutOberon = updatedAllPlayers.filter(p => p.team == 'EVIL' && p.role != 'OBERON').map(p => p.id);

    // ids of merlins for percival
    const merlinIds = updatedAllPlayers.filter(p => p.role == 'MORGANA' || p.role == 'MERLIN').map(p => p.id);

    updatedAllPlayers.forEach(p => {
      if (p.role == 'MERLIN' || p.role == 'OBERON') { 
        p.metadata = evilPlayerIds.slice();
      } else if (p.team == 'EVIL') {
        p.metadata = evilPlayerIdsWithoutOberon.slice();
      } else if (p.role == 'PERCIVAL') {
        p.metadata = merlinIds.slice();
      }
    });

    updatedAllPlayers.storeInRedis(redisClient).emitToAll(io, roomId);

    return this.avalon;
  }
}

module.exports = RoleReveal;