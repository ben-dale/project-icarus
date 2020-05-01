const Player = require('./Player');
const MockRedisClient = require('./mocks/MockRedisClient');

test('init creates new player', () => {
  const player = new Player().init('2930e', 'Ben');

  expect(player.id).toBe('2930e');
  expect(player.name).toBe('Ben');
  expect(player.vote).toBe('');
  expect(player.ready).toBe(false);
});

test('store in redis', () => {
  let redisClient = new MockRedisClient();
  const player = new Player().init('2930e', 'Ben');

  player.storeInRedis(redisClient);

  expect(redisClient.setKey).toBe('2930e');
  expect(redisClient.setValue).toBe(JSON.stringify(player));
  expect(redisClient.expireKey).toBe('2930e');
  expect(redisClient.expireTime).toBe(86400);
});

test('get from redis', () => {
  let result = '{"id": "2930e", "name": "Ben", "vote": "", "ready": false}';
  let redisClient = new MockRedisClient();
  redisClient.resultToReturn(result);

  new Player().getFromRedis(redisClient, '2930e', (result) => {
    expect(result.id).toBe('2930e');
  }, () => { });
});