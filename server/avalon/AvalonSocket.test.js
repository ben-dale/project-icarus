const AvalonSocket = require('./AvalonSocket');
const Player = require('../common/models/Player');
const Room = require('../common/models/Room');
const MockRedisClient = require('../mocks/MockRedisClient');
const MockIo = require('../mocks/MockIo')

test('disconnect player from open game', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const player = new Player().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new Room().init('roomId');
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerDisconnected(io, redisClient, socket);

  // Then
  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'room-updated').length).toBe(1);
  expect(io.inId).toBe('roomId');
  expect(io.obj).toBeDefined();

  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.disconnectedPlayerIds).toStrictEqual([]);
  }, () => { });
});

test('disconnect player from closed game', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const player = new Player().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new Room().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerDisconnected(io, redisClient, socket);

  // Then
  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'room-updated').length).toBe(1);
  expect(io.inId).toBe('roomId');
  expect(io.obj).toBeDefined();

  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.disconnectedPlayerIds).toStrictEqual(['socketId']);
  }, () => { });
});

test('adds player to room', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId', join() { } };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const data = { name: 'Ben', roomId: 'roomId' };

  const room = new Room().init('roomId');
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerJoined(io, redisClient, socket, data);

  // Then
  new Player().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.name).toBe('Ben');
    expect(player.ready).toBe(false);
    expect(player.roomId).toBe('roomId');
  }, () => { });

  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.id).toBe('roomId');
    expect(room.playerIds).toStrictEqual(['socketId']);
  }, () => { });

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'room-updated').length).toBe(1);
  expect(io.inId).toBe('roomId');
  expect(io.obj).toBeDefined();
});


test('does not add player to room', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId', emit() { } };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const data = { name: 'Ben', roomId: 'roomId' };

  const room = new Room().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerJoined(io, redisClient, socket, data);

  // Then
  new Player().getFromRedis(redisClient, 'socketId', () => {
    // Should not get here.
    expect(true).toBe(false);
  }, () => { });

  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.id).toBe('roomId');
    expect(room.playerIds).toStrictEqual([]);
  }, () => { });

  expect(io.messageHistory.length).toBe(0);
});

test('update player with ready status', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { ready: true }

  const player = new Player().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new Room().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new Player().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.ready).toBe(true);
  }, () => { });

  expect(io.messageHistory.length).toBe(1);
  expect(io.messageHistory[0]).toBe('player-updated');
  expect(io.obj).toBeDefined();
});

test('update player with proposal approval vote', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { approveProposal: true }

  const player = new Player().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new Room().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new Player().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.vote).toBe('APPROVE');
  }, () => { });

  expect(io.messageHistory.length).toBe(1);
  expect(io.messageHistory[0]).toBe('player-updated');
  expect(io.obj).toBeDefined();
});

test('update player with proposal approval vote', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { succeedQuest: true }

  const player = new Player().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new Room().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new Player().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.vote).toBe('SUCCEED');
  }, () => { });

  expect(io.messageHistory.length).toBe(1);
  expect(io.messageHistory[0]).toBe('player-updated');
  expect(io.obj).toBeDefined();
});

test('start next section of game', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId', ready: true };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = {};

  new Player().init('1', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new Player().init('2', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new Player().init('3', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new Player().init('4', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId').addPlayerId('1').addPlayerId('2').addPlayerId('3').addPlayerId('4');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new Player().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.ready).toBe(false);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('enable roles', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { settings: { percivalEnabled: true, oberonEnabled: true, morganaEnabled: true } } };

  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId');
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.settings.percivalEnabled).toBe(true);
    expect(room.game.settings.morganaEnabled).toBe(true);
    expect(room.game.settings.oberonEnabled).toBe(true);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('proposes player id', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { currentQuest: { playerIdToPropose: 'socketId' } } };

  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.organiserId = 'socketId';
  room.game.currentQuest.requiredPlayers = 3;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.currentQuest.proposedPlayerIds).toStrictEqual(['socketId']);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});


test('unproposes player id', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { currentQuest: { playerIdToUnpropose: 'socketId' } } };

  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.proposedPlayerIds = ['socketId']
  room.game.currentQuest.organiserId = 'socketId';
  room.game.currentQuest.requiredPlayers = 3;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.currentQuest.proposedPlayerIds).toStrictEqual([]);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('proposes merlin id', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { currentQuest: { merlinIdToPropose: 'socketId' } } };

  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.proposedPlayerIds = [];
  room.game.currentQuest.requiredPlayers = 1;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.currentQuest.proposedPlayerIds).toStrictEqual(['socketId']);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('unproposes merlin id', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { currentQuest: { merlinIdToUnpropose: 'socketId' } } };

  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.proposedPlayerIds = ['socketId'];
  room.game.currentQuest.requiredPlayers = 1;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.currentQuest.proposedPlayerIds).toStrictEqual([]);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('reveals quest vote', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { currentQuest: { voteToReveal: 1 } } };

  new Player().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new Room().init('roomId').addPlayerId('socketId');
  room.game.currentQuest = room.game.currentQuest.withSucceedVote().withSucceedVote().withSucceedVote();
  room.game.currentQuest.organiserId = 'socketId';
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new Room().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.currentQuest.votes[1].revealed).toBe(true);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

