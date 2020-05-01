const Room = require('./Room');
const MockRedisClient = require('./mocks/MockRedisClient');

test('store in redis', () => {
  let redisClient = new MockRedisClient();
  let room = new Room().init('123');

  room.storeInRedis(redisClient, '325t3');

  expect(redisClient.setKey).toBe('325t3');
  expect(redisClient.setValue).toBe(JSON.stringify(room));
  expect(redisClient.expireKey).toBe('325t3');
  expect(redisClient.expireTime).toBe(86400);
});

test('get from redis', () => {
  let result = '{"ownerId":"123","playerIds":[],"game":{"closed":false,"screen":"LOBBY","state":"","currentQuest":{"id":1,"disagreements":0,"organiserId":"","proposedPlayerIds":[],"proposalAccepted":false,"votes":[],"result":""},"settings":{"morganaEnabled":false,"percivalEnabled":false,"oberonEnabled":false},"questLogs":[]}}'
  let redisClient = new MockRedisClient();
  redisClient.resultToReturn(result);

  let room = new Room().init('123');

  room.getFromRedis(redisClient, 'roomId', (result) => {
    expect(result.ownerId).toBe('123');
    expect(result.playerIds).toStrictEqual([]);
  }, () => { });
});