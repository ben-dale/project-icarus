const RandomInteger = require('./RandomInteger');
const CurrentQuest = require('./CurrentQuest');

class Avalon {
  constructor(playerIds) {
    this.playerIds = playerIds;
  }

  startGame() {
    const questConfigurations = {
      5: [2, 3, 2, 3, 3],
      6: [2, 3, 4, 3, 4],
      7: [2, 3, 4, 3, 4],
      8: [3, 4, 4, 5, 5],
      9: [3, 4, 4, 5, 5],
      10: [3, 4, 4, 5, 5]
    }

    // TODO move to class
    let questLogs = [];
    let questConfig = questConfigurations[this.playerIds.length];
    for (let i = 0; i < 5; i++) {
      let playersRequired = questConfig[i];
      let questMembers = [];
      for (let j = 0; j < playersRequired; j++) {
        questMembers.push("");
      }
      questLogs.push({ id: i + 1, requiresDoubleFail: false, required: playersRequired, organiser: "", members: questMembers, result: "" });
    }

    // TODO move to class
    let organiserId = this.playerIds[new RandomInteger().between(0, this.playerIds.length - 1)].id;
    let currentQuest = new CurrentQuest().init(organiserId);
    this.questLogs = questLogs;
    this.currentQuest = currentQuest;
    this.closed = true;
    this.screen = "ROLE_REVEAL";
    this.state = "QUEST_PROPOSING";
    // todo should return new AvalonInstance here?
  }

  // todo private methods
  goodPlayerCount() {
    switch (this.playerIds.length) {
      case 5: return 3;
      case 6: return 4;
      case 7: return 4;
      case 8: return 5;
      case 9: return 6;
      case 10: return 6;
    }
  }

  // todo private methods
  evilPlayerCount() {
    switch (this.playerIds.length) {
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