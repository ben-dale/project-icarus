class MockRedis {
  constructor(dataToReturn) {
    this.dataToReturn = dataToReturn;
    this.idsToPut = [];
    this.objectsToPut = [];
  }

  getObjects(keys, onSuccess) {
    this.keys = keys;
    onSuccess(this.dataToReturn)
  }

  putObject(id, object) {
    this.idsToPut.push(id);
    this.objectsToPut.push(object);
  }
}

module.exports = MockRedis;