const AllPlayers = require('./AllPlayers');

test('returns false when all players are not ready', () => {
  let players = [{ id: '1', name: 'Ben', ready: false }]
  expect(new AllPlayers(players).areReady()).toBe(false);
});

test('returns true when all players are ready', () => {
  let players = [{ id: '1', name: 'Ben', ready: true }]
  expect(new AllPlayers(players).areReady()).toBe(true);
});

test('returns 3 good players when there are 5 total players', () => {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true }
  ]
  expect(new AllPlayers(players).goodPlayerCount()).toBe(3);
});

test('returns 6 good players when there are 10 total players', () => {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true },
    { id: '6', name: 'Ben', ready: true },
    { id: '7', name: 'Ben', ready: true },
    { id: '8', name: 'Ben', ready: true },
    { id: '9', name: 'Ben', ready: true },
    { id: '10', name: 'Ben', ready: true }
  ]
  expect(new AllPlayers(players).goodPlayerCount()).toBe(6);
});

test('returns 2 evil players when there are 5 total players', () => {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true }
  ]
  expect(new AllPlayers(players).evilPlayerCount()).toBe(2);
});

test('returns 4 evil players when there are 10 total players', () => {
  let players = [
    { id: '1', name: 'Ben', ready: true },
    { id: '2', name: 'Ben', ready: true },
    { id: '3', name: 'Ben', ready: true },
    { id: '4', name: 'Ben', ready: true },
    { id: '5', name: 'Ben', ready: true },
    { id: '6', name: 'Ben', ready: true },
    { id: '7', name: 'Ben', ready: true },
    { id: '8', name: 'Ben', ready: true },
    { id: '9', name: 'Ben', ready: true },
    { id: '10', name: 'Ben', ready: true }
  ]
  expect(new AllPlayers(players).evilPlayerCount()).toBe(4);
});