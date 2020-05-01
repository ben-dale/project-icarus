class MockRedisClient {

  resultToReturn(result) {
    this.result = result;
  }

  errorToReturn(error) {
    this.error = error;
  }

  set(key, value) {
    this.setKey = key;
    this.setValue = value;
  }

  expire(key, time) {
    this.expireKey = key;
    this.expireTime = time;
  }

  get(id, callback) {
    this.idToGet = id;
    callback(this.error, this.result);
  }

  mget(ids, callback) {
    this.idsToGet = ids;
    callback(this.error, this.result);
  }

}

module.exports = MockRedisClient;