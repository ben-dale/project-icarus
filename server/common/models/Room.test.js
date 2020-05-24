const Room = require('./Room');
const QuestLog = require('../../avalon/models/QuestLog');
const MockRedisClient = require('../../mocks/MockRedisClient');
const MockIo = require('../../mocks/MockIo')

test('store and get from redis', () => {
  let redisClient = new MockRedisClient();
  let room = new Room().init('325t3');

  room.storeInRedis(redisClient, '325t3');

  new Room().getFromRedis(redisClient, '325t3', (room) => {
    expect(room.id).toBe('325t3');
  }, () => { });
  expect(redisClient.expireKey).toBe('325t3');
  expect(redisClient.expireTime).toBe(43200);
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

test('disconnects an active player', () => {
  const room = new Room().init('111');

  const result = room.disconnectActivePlayer('393');

  expect(result.disconnectedPlayerIds).toStrictEqual(['393']);
});

test('disconnects player', () => {
  const room = new Room().init('111').addPlayerId('123').addPlayerId('456');

  const result = room.disconnectPlayer('456');

  expect(result.playerIds).toStrictEqual(['123']);
});

test('disconnects owner', () => {
  const room = new Room().init('111').addPlayerId('123').addPlayerId('456');

  const result = room.disconnectPlayer('123');

  expect(result.playerIds).toStrictEqual(['456']);
  expect(result.ownerId).toBe('456');
});

test('disconnects owner and clears room owner', () => {
  const room = new Room().init('111').addPlayerId('123');

  const result = room.disconnectPlayer('123');

  expect(result.playerIds).toStrictEqual([]);
  expect(result.ownerId).toBe('');
});

test('reconnects player', () => {
  const room = new Room().init('111').addPlayerId('123').addPlayerId('456').disconnectActivePlayer('456');
  room.game.currentQuest.organiserId = '456';
  room.game.currentQuest.proposedPlayerIds = ['666', '456']
  room.game.questLogs.push(new QuestLog().init(1, 2).withOrganiserId('456').addPlayer('666').addPlayer('456'));

  const result = room.reconnectPlayer('456', '888');

  expect(result.playerIds).toStrictEqual(['123', '888']);
  expect(result.disconnectedPlayerIds).toStrictEqual([]);
  expect(result.game.currentQuest.organiserId).toBe('888');
  expect(result.game.currentQuest.proposedPlayerIds).toStrictEqual(['666', '888']);
  expect(result.game.questLogs[0].playerIds).toStrictEqual(['666', '888']);
  expect(result.game.questLogs[0].organiserId).toBe('888');
});


test('reconnects owner', () => {
  const room = new Room().init('111').addPlayerId('123').addPlayerId('456').disconnectActivePlayer('123');

  const result = room.reconnectPlayer('123', '888');

  expect(result.playerIds).toStrictEqual(['888', '456']);
});