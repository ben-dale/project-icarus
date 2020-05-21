class BasicState {
  constructor(avalon) {
    this.avalon = avalon;
  }

  start(redisClient, io, allPlayers, roomId, screen, state) {
    this.avalon.screen = screen;
    this.avalon.state = state;

    allPlayers.resetReadyStatuses().resetVotes().storeInRedis(redisClient).emitToAll(io, roomId);
  }
}

module.exports = BasicState;