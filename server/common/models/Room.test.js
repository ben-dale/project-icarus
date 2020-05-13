const Room = require('./Room');
const MockRedisClient = require('../../mocks/MockRedisClient');
const MockIo = require('../../mocks/MockIo')

test('store in redis', () => {
  let redisClient = new MockRedisClient();
  let room = new Room().init('325t3');

  room.storeInRedis(redisClient, '325t3');

  expect(redisClient.setKey).toBe('325t3');
  expect(redisClient.setValue).toBe(JSON.stringify(room));
  expect(redisClient.expireKey).toBe('325t3');
  expect(redisClient.expireTime).toBe(86400);
});

test('get from redis', () => {
  let result = '{"ownerId":"123","playerIds":[],"disconnectedPlayerIds":[],"game":{"closed":false,"screen":"LOBBY","state":"","currentQuest":{"id":1,"disagreements":0,"organiserId":"","proposedPlayerIds":[],"proposalAccepted":false,"votes":[],"result":""},"settings":{"morganaEnabled":false,"percivalEnabled":false,"oberonEnabled":false},"questLogs":[]}}'
  let redisClient = new MockRedisClient();
  redisClient.resultToReturn(result);

  let room = new Room().init('123');

  room.getFromRedis(redisClient, 'roomId', (result) => {
    expect(result.ownerId).toBe('123');
    expect(result.playerIds).toStrictEqual([]);
  }, () => { });
});

test('add player id and sets owner id', () => {
  const room = new Room().init('111').addPlayerId('123');

  expect(room.playerIds).toStrictEqual(['123']);
  expect(room.ownerId).toBe('123');
});

test('add second player', () => {
  const room = new Room().init('111').addPlayerId('123').addPlayerId('293');

  expect(room.playerIds).toStrictEqual(['123', '293']);
  expect(room.ownerId).toBe('123');
});

test('has player id', () => {
  const room = new Room().init('111').addPlayerId('123');

  expect(room.hasPlayerId('123'));
});

test('emit to all', () => {
  let room = new Room().init('325t3');
  const io = new MockIo();

  room.emitToAll(io, '39fnr9')

  expect(io.message).toBe('room-updated');
  expect(io.obj).toStrictEqual(room);
});

test('returns true when enough players are in the room', () => {
  const room = new Room().init('111').addPlayerId('1').addPlayerId('2').addPlayerId('3').addPlayerId('4').addPlayerId('5');

  expect(room.hasEnoughPlayers()).toBe(true);
});