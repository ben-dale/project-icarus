const RandomInteger = require('./RandomInteger');
const CurrentQuest = require('./CurrentQuest');
const QuestLog = require('./QuestLog');
const Settings = require('./Settings');

class Avalon {

  fromRawObject(obj) {
    this.questLogs = obj.questLogs.map(ql => new QuestLog().fromRawObject(ql));
    this.settings = new Settings().fromRawObject(obj.settings);
    this.currentQuest = new CurrentQuest().fromRawObject(obj.currentQuest);
    this.screen = obj.screen;
    this.state = obj.state;
    this.closed = obj.closed;
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

  startGame(playerIds) {
    let questLogs = [];
    let questConfig = this.playersRequiredEachQuest(playerIds.length);
    for (let i = 0; i < 5; i++) {
      questLogs.push(new QuestLog().init(i + 1, questConfig[i]));
    }

    // TODO decide which player is which role here?
    // Probably needs to take in AllPlayers object to mutate and store
    // shuffle player ids at the start of the game to change player order

    this.settings = new Settings().init();
    this.questLogs = questLogs;
    this.currentQuest = new CurrentQuest().init(this.randomPlayerId(playerIds));
    this.closed = true;
    this.screen = 'ROLE_REVEAL';
    this.state = 'QUEST_PROPOSING';
    return this;
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