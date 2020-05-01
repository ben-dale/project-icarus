const RandomInteger = require('./RandomInteger');
const CurrentQuest = require('./CurrentQuest');
const QuestLog = require('./QuestLog');
const Settings = require('./Settings');

class Avalon {

  startGame(playerIds) {
    let questLogs = [];
    let questConfig = this.playersRequiredEachQuest(playerIds.length);
    for (let i = 0; i < 5; i++) {
      questLogs.push(new QuestLog().init(i + 1, questConfig[i]));
    }

    this.settings = new Settings().init();
    this.questLogs = questLogs;
    this.currentQuest = new CurrentQuest().init(this.randomPlayerId(playerIds));
    this.closed = true;
    this.screen = "ROLE_REVEAL";
    this.state = "QUEST_PROPOSING";
  }

  randomPlayerId(playerIds) {
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

  // todo private methods
  goodPlayerCount(playerIds) {
    switch (playerIds.length) {
      case 5: return 3;
      case 6: return 4;
      case 7: return 4;
      case 8: return 5;
      case 9: return 6;
      case 10: return 6;
    }
  }

  // todo private methods
  evilPlayerCount(playerIds) {
    switch (playerIds.length) {
      case 5: return 2;
      case 6: return 2;
      case 7: return 3;
      case 8: return 3;
      case 9: return 3;
      case 10: return 4;
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