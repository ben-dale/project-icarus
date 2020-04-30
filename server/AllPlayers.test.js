const AllPlayers = require('./AllPlayers');
const MockRedis = require('./mocks/MockRedis');

test('returns false when all players are not ready', () => {
  let players = [{ id: '1', name: 'Ben', ready: false }]
  expect(new AllPlayers(players).areReady()).toBe(false);
});

test('returns true when all players are ready', () => {
  let players = [{ id: '1', name: 'Ben', ready: true }]
  expect(new AllPlayers(players).areReady()).toBe(true);
});

test('sets ready to false on all players', () => {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true }
  ];

  let alteredPlayers = new AllPlayers(players).resetReadyStatuses();

  expect(alteredPlayers.players).toStrictEqual([
    { id: '1', name: 'Ben', ready: false },
    { id: '2', name: 'Ben', ready: false },
    { id: '3', name: 'Ben', ready: false },
    { id: '4', name: 'Ben', ready: false },
    { id: '5', name: 'Ben', ready: false }
  ]);
});

test('stores players in redis', () => {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true }
  ];

  let redis = new MockRedis();
  new AllPlayers(players).storeIn(redis);

  expect(redis.idsToPut).toStrictEqual(['1', '2', '3', '4', '5'])
});

test('shuffles order of players', () =>  {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true }
  ];

  expect(new AllPlayers(players).shuffle()).not.toStrictEqual(players)
});