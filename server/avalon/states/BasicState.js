class BasicState {
  constructor(avalon, screen, state) {
    this.avalon = avalon;
    this.avalon.screen = screen;
    this.avalon.state = state;
  }

  withResult(result) {
    this.avalon.result = result;
    return this;
  }

  resetPlayersAndEmit(redisClient, io, allPlayers, roomId) {
    allPlayers.resetReadyStatuses().resetVotes().storeInRedis(redisClient).emitToAll(io, roomId);
  }
}

module.exports = BasicState;