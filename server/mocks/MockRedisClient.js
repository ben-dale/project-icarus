class MockRedisClient {

  constructor() {
    this.data = {};
  }

  keyCount() {
    return Object.keys(this.data).length;
  }

  filter(predicate) {
    const values = Object.keys(this.data).map(key => this.data[key]);
    return values.filter(predicate);
  }

  set(key, value) {
    this.data[key] = value;
  }

  expire(key, time) {
    this.expireKey = key;
    this.expireTime = time;
  }

  get(id, callback) {
    this.idToGet = id;
    callback(this.error, this.data[id]);
  }

  mget(ids, callback) {
    this.idsToGet = ids;
    const dataToReturn = [];
    for (let i = 0; i < ids.length; i++) {
      dataToReturn.push(this.data[ids[i]]);
    }
    callback(this.error, dataToReturn);
  }

}

module.exports = MockRedisClient;