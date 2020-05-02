const AllPlayers = require('./AllPlayers');
const Player = require('./Player');
const MockRedisClient = require('./mocks/MockRedisClient');
const MockIo = require('./mocks/MockIo')

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

test('emit to all', () => {
  const player = new Player().init('111', 'Ben', '5t6y');
  const io = new MockIo();
  const allPlayers = new AllPlayers().init([player]);

  allPlayers.emitToAll(io, '39fnr9')

  const expected = new Player();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expect(io.message).toBe('players-updated');
  expect(io.obj).toStrictEqual([expected]);
});

test('emit to all with vote', () => {
  const player = new Player().init('111', 'Ben', '5t6y');
  const io = new MockIo();
  const allPlayers = new AllPlayers().init([player]);

  allPlayers.emitToAllWithVote(io, '39fnr9')

  const expected = new Player();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expected.vote = '';
  expect(io.message).toBe('players-updated');
  expect(io.obj).toStrictEqual([expected]);
});

test('emit to all with team and role', () => {
  const player = new Player().init('111', 'Ben', '5t6y');
  const io = new MockIo();
  const allPlayers = new AllPlayers().init([player]);

  allPlayers.emitToAllWithTeamAndRole(io, '39fnr9')

  const expected = new Player();
  expected.id = '111';
  expected.name = 'Ben';
  expected.ready = false;
  expected.team = '';
  expected.role = '';
  expect(io.message).toBe('players-updated');
  expect(io.obj).toStrictEqual([expected]);
});

test('resets all player statuses', () => {
  const player = new Player().init('111', 'Ben', '5t6y').withReady(true);

  const allPlayers = new AllPlayers().init([player]).resetReadyStatuses();

  expect(allPlayers.players[0].ready).toBe(false);
});