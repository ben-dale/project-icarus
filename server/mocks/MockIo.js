class MockIo {
  constructor() {
    this.inId = "";
    this.message = "";
    this.messageHistory = [];
    this.obj = {};
    this.objHistory = [];
  }

  in(roomId) {
    this.inId = roomId;
    return this;
  }

  emit(message, obj) {
    this.message = message;
    this.messageHistory.push(message);
    this.obj = obj;
    this.objHistory.push(obj);
  }

  to(playerId) {
    this.toPlayerId = playerId;
    return this;
  }
}

module.exports = MockIo;