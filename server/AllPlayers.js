class AllPlayers {
  constructor(players) {
    this.players = players;
  }

  areReady() {
    return this.players.filter(p => !p.ready).length == 0;
  }

  resetReadyStatuses() {
    let alteredPlayers = this.players.map(p => {
      let alteredPlayer = Object.assign({}, p);
      alteredPlayer.ready = false;
      return alteredPlayer;
    });
    return new AllPlayers(alteredPlayers);
  }

  storeIn(db) {
    this.players.forEach(p => db.putObject(p.id, p));
  }

  shuffle() {
    let clonedPlayers = this.players.map(p => p);
    while (clonedPlayers.filter((p, i) => p.id == this.players[i].id).length > 0) {
      for (let i = clonedPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedPlayers[i], clonedPlayers[j]] = [clonedPlayers[j], clonedPlayers[i]];
      }
    }
    return clonedPlayers;
  }
}

module.exports = AllPlayers;