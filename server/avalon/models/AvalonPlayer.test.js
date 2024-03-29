const AvalonPlayer = require('./AvalonPlayer');
const MockRedisClient = require('../../mocks/MockRedisClient');
const MockIo = require('../../mocks/MockIo')

test('init creates new player', () => {
  const player = new AvalonPlayer().init('2930e', 'ben', '5t6y');

  expect(player.id).toBe('2930e');
  expect(player.name).toBe('Ben');
  expect(player.vote).toBe('');
  expect(player.ready).toBe(false);
});

test('store and get from redis', () => {
  let redisClient = new MockRedisClient();
  const player = new AvalonPlayer().init('playerId', 'Ben', '5t6y');

  player.storeInRedis(redisClient);

  expect(new AvalonPlayer().getFromRedis(redisClient, 'playerId', (player) => {
    expect(player.id).toBe('playerId');
  }, () => { }));
  expect(redisClient.expireKey).toBe('playerId');
  expect(redisClient.expireTime).toBe(43200);
});

test('emit to all', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y');
  const io = new MockIo();

  player.emitToAll(io)

  const expected = new AvalonPlayer();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expect(io.message).toBe('player-updated');
  expect(io.obj).toStrictEqual(expected);
});

test('sets team', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withTeam('GOOD');
  expect(player.team).toBe('GOOD')
});

test('sets vote to proposal approved value', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withProposalApproved(true);

  expect(player.vote).toBe('APPROVE');
});

test('sets vote to proposal rejected value', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withProposalApproved(false);

  expect(player.vote).toBe('REJECT');
})

test('clears vote', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withProposalApproved(true).clearVote();

  expect(player.vote).toBe('');
});

test('sets vote to succeed quest for good player', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withTeam('GOOD').withSucceedQuest(true);

  expect(player.vote).toBe('SUCCEED');
});

test('sets vote to succeed quest for evil player', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withTeam('EVIL').withSucceedQuest(true);

  expect(player.vote).toBe('SUCCEED');
});

test('does not set vote to sabotage quest for good player', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withTeam('GOOD').withSucceedQuest(false);

  expect(player.vote).toBe('SUCCEED');
});

test('sets vote to sabotage quest for evil player', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withTeam('EVIL').withSucceedQuest(false);

  expect(player.vote).toBe('SABOTAGE');
});


test('sets role', () => {
  const player = new AvalonPlayer().init('111', 'Ben', '5t6y').withRole('MERLIN');
  expect(player.role).toBe('MERLIN')
});

test('reconnects player', () => {
  const id = '111';
  const newId = '222';
  const player = new AvalonPlayer().init(id, 'Ben', '5t6y').withRole('MERLIN').withMetadata(['111', '666']);

  const result = player.reconnect(id, newId);

  expect(result.id).toBe('222');
  expect(result.metadata).toStrictEqual(['222', '666']);
});