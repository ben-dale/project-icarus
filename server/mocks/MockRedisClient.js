class MockRedisClient {

  resultToReturn(result) {
    this.result = result;
  }

  errorToReturn(error) {
    this.error = error;
  }

  get(id, callback) {
    this.idToGet = id;
    callback(this.error, this.result);
  }

}

module.exports = MockRedisClient;