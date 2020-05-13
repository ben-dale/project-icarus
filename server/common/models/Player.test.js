const Player = require('./Player');
const MockRedisClient = require('../../mocks/MockRedisClient');
const MockIo = require('../../mocks/MockIo')

test('init creates new player', () => {
  const player = new Player().init('2930e', 'ben', '5t6y');

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


test('sets vote to proposal approved value', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withProposalApproved(true);

  expect(player.vote).toBe('APPROVE');
});


test('sets vote to proposal rejected value', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withProposalApproved(false);

  expect(player.vote).toBe('REJECT');
})

test('clears vote', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withProposalApproved(true).clearVote();

  expect(player.vote).toBe('');
});

test('sets vote to succeed quest for good player', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withTeam('GOOD').withSucceedQuest(true);

  expect(player.vote).toBe('SUCCEED');
});

test('sets vote to succeed quest for evil player', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withTeam('EVIL').withSucceedQuest(true);

  expect(player.vote).toBe('SUCCEED');
});

test('does not set vote to sabotage quest for good player', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withTeam('GOOD').withSucceedQuest(false);

  expect(player.vote).toBe('SUCCEED');
});

test('sets vote to sabotage quest for evil player', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withTeam('EVIL').withSucceedQuest(false);

  expect(player.vote).toBe('SABOTAGE');
});


test('sets role', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withRole('MERLIN');
  expect(player.role).toBe('MERLIN')
});

test('emits all data to player', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withRole('MERLIN').withTeam('GOOD');
  const io = new MockIo();

  player.emitToPlayer(io, ['444', '555']);

  const expected = new Player();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expected.role = 'MERLIN';
  expected.team = 'GOOD';
  expected.metadata = [ '444', '555' ]
  expect(io.toPlayerId).toBe('111');
  expect(io.message).toBe('player-assigned');
  expect(io.obj).toStrictEqual(expected);
});