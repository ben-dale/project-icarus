class AllPlayers {
  constructor(players) {
    this.players = players;
  }

  areReady() {
    return this.players.filter(p => !p.ready).length == 0;
  }

  goodPlayerCount() {
    switch (this.players.length) {
      case 5: return 3;
      case 6: return 4;
      case 7: return 4;
      case 8: return 5;
      case 9: return 6;
      case 10: return 6;
    }
  }

  evilPlayerCount() {
    switch (this.players.length) {
      case 5: return 2;
      case 6: return 2;
      case 7: return 3;
      case 8: return 3;
      case 9: return 3;
      case 10: return 4;
    }
  }
}

module.exports = AllPlayers;