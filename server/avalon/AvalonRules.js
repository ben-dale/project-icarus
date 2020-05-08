class AvalonRules {

  constructor(playerCount) {
    this.playerCount = playerCount;
  }

  numberOfGoodPlayers() {
    switch (this.playerCount) {
      case 5: return 3;
      case 6: return 4;
      case 7: return 4;
      case 8: return 5;
      case 9: return 6;
      case 10: return 6;
    }
  }

  numberOfEvilPlayers() {
    return this.playerCount - this.numberOfGoodPlayers();
  }

  numberOfPlayersRequiredForQuest(quest) {
    switch (this.playerCount) {
      case 5: return [2, 3, 2, 3, 3][quest];
      case 6: return [2, 3, 4, 3, 4][quest];
      case 7: return [2, 3, 4, 3, 4][quest];
      case 8: return [3, 4, 4, 5, 5][quest];
      case 9: return [3, 4, 4, 5, 5][quest];
      case 10: return [3, 4, 4, 5, 5][quest];
    }
  }
}


module.exports = AvalonRules;