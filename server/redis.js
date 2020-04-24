const redis = require('redis');
var REDIS_URL = process.env.REDIS_URL
var redisClient = REDIS_URL ? redis.createClient(REDIS_URL) : redis.createClient(); // defaults a connection to localhost:6379

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

module.exports = {
  putObject: function (key, value) {
    redisClient.set(key, JSON.stringify(value));
    redisClient.expire(key, 86400);
  },
  getObject: function (key, onSuccess, onError) {
    redisClient.get(key, (error, result) => {
      if (error) {
        onError();
      } else {
        onSuccess(JSON.parse(result));
      }
    });
  }

}