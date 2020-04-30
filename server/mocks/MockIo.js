class MockIo {
  constructor() {
    this.inId = "";
    this.message = "";
    this.obj = {};
  }

  in(roomId) {
    this.inId = roomId;
    return this;
  }

  emit(message, obj) {
    this.message = message;
    this.obj = obj;
  }
}

module.exports = MockIo;