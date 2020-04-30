class MockRedis {
  constructor(dataToReturn) {
    this.dataToReturn = dataToReturn;
  }

  getObjects(keys, onSuccess) {
    this.keys = keys;
    onSuccess(this.dataToReturn)
  }
}

module.exports = MockRedis;