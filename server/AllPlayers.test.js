const AllPlayers = require('./AllPlayers');
const Player = require('./Player');
const MockRedisClient = require('./mocks/MockRedisClient');

test('returns false when all players are not ready', () => {
  let players = [new Player('111', 'Ben').withReady(false)];

  expect(new AllPlayers().init(players).areReady()).toBe(false);
});

test('returns true when all players are ready', () => {
  let players = [new Player('111', 'Ben').withReady(true)];

  expect(new AllPlayers().init(players).areReady()).toBe(true);
});

test('gets players from redis', () => {
  let playerIds = ['111', '222'];

  let redisClient = new MockRedisClient();
  redisClient.resultToReturn(['{ "id": "111", "name": "Ben", "vote": "", "ready": false }', '{ "id": "222", "name": "Sam", "vote": "", "ready": false }']);

  new AllPlayers().getFromRedis(redisClient, playerIds, (allPlayers) => {
    expect(allPlayers.players.length).toBe(2);
  }, () => { });

});