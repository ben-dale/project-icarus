const Player = require('./Player');
const MockRedisClient = require('./mocks/MockRedisClient');
const MockIo = require('./mocks/MockIo')

test('init creates new player', () => {
  const player = new Player().init('2930e', 'Ben', '5t6y');

  expect(player.id).toBe('2930e');
  expect(player.name).toBe('Ben');
  expect(player.vote).toBe('');
  expect(player.ready).toBe(false);
});

test('store in redis', () => {
  let redisClient = new MockRedisClient();
  const player = new Player().init('2930e', 'Ben', '5t6y');

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

test('emit to all', () => {
  const player = new Player().init('111', 'Ben', '5t6y');
  const io = new MockIo();

  player.emitToAll(io)

  const expected = new Player();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expect(io.message).toBe('player-updated');
  expect(io.obj).toStrictEqual(expected);
});

test('sets team', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withTeam('GOOD');
  expect(player.team).toBe('GOOD')
});


test('sets role', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withRole('MERLIN');
  expect(player.role).toBe('MERLIN')
});

test('emits all data to player', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withRole('MERLIN').withTeam('GOOD');
  const io = new MockIo();

  player.emitToPlayer(io);

  const expected = new Player();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expected.role = 'MERLIN';
  expected.team = 'GOOD';
  expect(io.toPlayerId).toBe('111');
  expect(io.message).toBe('player-assigned');
  expect(io.obj).toStrictEqual(expected);
});