const AvalonRoom = require('../../avalon/models/AvalonRoom');
const MockIo = require('../../mocks/MockIo')

/**
 * This test classes uses AvalonRoom as an implementation to help test methods in Room.js
 */

test('add player id and sets owner id', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123');

  expect(room.playerIds).toStrictEqual(['123']);
  expect(room.ownerId).toBe('123');
});

test('add second player', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123').addPlayerId('293');

  expect(room.playerIds).toStrictEqual(['123', '293']);
  expect(room.ownerId).toBe('123');
});

test('has player id', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123');

  expect(room.hasPlayerId('123'));
});

test('emit to all', () => {
  let room = new AvalonRoom().init('325t3');
  const io = new MockIo();

  room.emitToAll(io, '39fnr9')

  expect(io.message).toBe('room-updated');
  expect(io.obj).toStrictEqual(room);
});

test('returns true when enough players are in the room', () => {
  const room = new AvalonRoom().init('111').addPlayerId('1').addPlayerId('2').addPlayerId('3').addPlayerId('4').addPlayerId('5');

  expect(room.hasEnoughPlayers()).toBe(true);
});

test('disconnects an active player', () => {
  const room = new AvalonRoom().init('111');

  const result = room.disconnectActivePlayer('393');

  expect(result.disconnectedPlayerIds).toStrictEqual(['393']);
});

test('disconnects player', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123').addPlayerId('456');

  const result = room.disconnectPlayer('456');

  expect(result.playerIds).toStrictEqual(['123']);
});

test('disconnects owner', () => {
  const room = new AvalonRoom().init('111').addPlayerId('123').addPlayerId('456');

  const result = room.disconnectPlayer('123');

  expect(result.playerIds).toStrictEqual(['456']);
  expect(result.ownerId).toBe('456');
});

