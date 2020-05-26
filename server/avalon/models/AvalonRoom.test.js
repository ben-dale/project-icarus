const AvalonRoom = require('./AvalonRoom');
const QuestLog = require('../models/QuestLog');
const MockRedisClient = require('../../mocks/MockRedisClient');

test('disconnects owner and clears room owner', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123');

  const result = room.disconnectPlayer('123');

  expect(result.playerIds).toStrictEqual([]);
  expect(result.ownerId).toBe('');
});

test('reconnects player', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123').addPlayerId('456').disconnectActivePlayer('456');
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
  const room = new AvalonRoom().init('111').addPlayerId('123').addPlayerId('456').disconnectActivePlayer('123');

  const result = room.reconnectPlayer('123', '888');

  expect(result.playerIds).toStrictEqual(['888', '456']);
});


test('store and get from redis', () => {
  let redisClient = new MockRedisClient();
  let room = new AvalonRoom().init('325t3');

  room.storeInRedis(redisClient, '325t3');

  new AvalonRoom().getFromRedis(redisClient, '325t3', (room) => {
    expect(room.id).toBe('325t3');
  }, () => { });
  expect(redisClient.expireKey).toBe('325t3');
  expect(redisClient.expireTime).toBe(43200);
});
