class MockRedisClient {

  constructor() {
    this.setKeyHistory = [];
    this.setValueHistory = [];
  }

  resultToReturn(result) {
    this.result = result;
  }

  errorToReturn(error) {
    this.error = error;
  }

  set(key, value) {
    this.setKey = key;
    this.setKeyHistory.push(key);
    this.setValue = value;
    this.setValueHistory.push(value);
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