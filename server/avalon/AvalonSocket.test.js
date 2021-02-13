const AvalonSocket = require('./AvalonSocket');
const AvalonPlayer = require('./models/AvalonPlayer');
const AvalonRoom = require('./models/AvalonRoom');
const MockRedisClient = require('../mocks/MockRedisClient');
const MockIo = require('../mocks/MockIo')

test('disconnect player from open game', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const player = new AvalonPlayer().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId');
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerDisconnected(io, redisClient, socket);

  // Then
  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'room-updated').length).toBe(1);
  expect(io.inId).toBe('roomId');
  expect(io.obj).toBeDefined();

  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.disconnectedPlayerIds).toStrictEqual([]);
  }, () => { });
});

test('disconnect player from closed game', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const player = new AvalonPlayer().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerDisconnected(io, redisClient, socket);

  // Then
  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'room-updated').length).toBe(1);
  expect(io.inId).toBe('roomId');
  expect(io.obj).toBeDefined();

  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  const room = new AvalonRoom().init('roomId');
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerJoined(io, redisClient, socket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.name).toBe('Ben');
    expect(player.ready).toBe(false);
    expect(player.roomId).toBe('roomId');
  }, () => { });

  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  const room = new AvalonRoom().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerJoined(io, redisClient, socket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, 'socketId', () => {
    // Should not get here.
    expect(true).toBe(false);
  }, () => { });

  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  const player = new AvalonPlayer().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.ready).toBe(true);
  }, () => { });

  console.log(io.messageHistory);
  expect(io.messageHistory.length).toBe(2);
  expect(io.messageHistory[0]).toBe('player-updated');
  expect(io.messageHistory[1]).toBe('player-assigned');
  expect(io.obj).toBeDefined();
});

test('update player with proposal approval vote', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { approveProposal: true }

  const player = new AvalonPlayer().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.vote).toBe('APPROVE');
  }, () => { });

  expect(io.messageHistory.length).toBe(2);
  expect(io.messageHistory[0]).toBe('player-updated');
  expect(io.messageHistory[1]).toBe('player-assigned');
  expect(io.obj).toBeDefined();
});

test('update player with proposal approval vote', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { succeedQuest: true }

  const player = new AvalonPlayer().init('socketId', 'Ben', 'roomId');
  player.storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.vote).toBe('SUCCEED');
  }, () => { });

  expect(io.messageHistory.length).toBe(2);
  expect(io.messageHistory[0]).toBe('player-updated');
  expect(io.messageHistory[1]).toBe('player-assigned');
  expect(io.obj).toBeDefined();
});

test('start next section of game', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId', ready: true };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = {};

  new AvalonPlayer().init('1', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('2', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('3', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('4', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId').addPlayerId('1').addPlayerId('2').addPlayerId('3').addPlayerId('4');
  room.game.closed = true;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.playerUpdated(io, redisClient, socket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, 'socketId', (player) => {
    expect(player.ready).toBe(false);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('enable settings', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { game: { settings: { percivalEnabled: true, oberonEnabled: true, morganaEnabled: true, questLogEnabled: true } } };

  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId');
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.settings.percivalEnabled).toBe(true);
    expect(room.game.settings.morganaEnabled).toBe(true);
    expect(room.game.settings.oberonEnabled).toBe(true);
    expect(room.game.settings.questLogEnabled).toBe(true);
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

  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.organiserId = 'socketId';
  room.game.currentQuest.requiredPlayers = 3;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.proposedPlayerIds = ['socketId']
  room.game.currentQuest.organiserId = 'socketId';
  room.game.currentQuest.requiredPlayers = 3;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.proposedPlayerIds = [];
  room.game.currentQuest.requiredPlayers = 1;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId');
  room.game.currentQuest.proposedPlayerIds = ['socketId'];
  room.game.currentQuest.requiredPlayers = 1;
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
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

  new AvalonPlayer().init('socketId', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('socketId');
  room.game.currentQuest = room.game.currentQuest.withSucceedVote().withSucceedVote().withSucceedVote();
  room.game.currentQuest.organiserId = 'socketId';
  room.storeInRedis(redisClient);

  // When
  avalonSocket.roomUpdated(io, redisClient, socket, data);

  // Then
  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => {
    expect(room.game.currentQuest.votes[1].revealed).toBe(true);
  }, () => { });

  expect(io.messageHistory).toContain('room-updated');
});

test('player rejoins', () => {
  // Given
  const avalonSocket = new AvalonSocket();
  const oldSocket = { id: '5' };
  const newSocket = { id: '789', join() { } };
  const io = new MockIo();
  const redisClient = new MockRedisClient();
  const data = { roomId: 'roomId', id: '5' };

  new AvalonPlayer().init('1', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('2', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('3', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('4', 'Sam', 'roomId').withReady(true).storeInRedis(redisClient);
  new AvalonPlayer().init('5', 'Ben', 'roomId').withReady(true).storeInRedis(redisClient);

  const room = new AvalonRoom().init('roomId').addPlayerId('1').addPlayerId('2').addPlayerId('3').addPlayerId('4').addPlayerId('5');
  room.game.state = 'QUEST_PROPOSAL_RESULT'
  room.game.screen = 'GAME'
  room.game.closed = true;
  room.storeInRedis(redisClient);

  avalonSocket.playerDisconnected(io, redisClient, oldSocket);

  // When
  io.messageHistory = [];
  avalonSocket.playerRejoined(io, redisClient, newSocket, data);

  // Then
  new AvalonPlayer().getFromRedis(redisClient, '789', (player) => {
    expect(player.name).toBe('Ben');
    expect(player.id).toBe('789');
  }, () => { })

  new AvalonRoom().getFromRedis(redisClient, 'roomId', (room) => { 
    expect(room.playerIds).toStrictEqual(['1', '2', '3', '4', '789']);
  }, () => { });

  expect(io.messageHistory[0]).toBe('player-assigned');
  expect(io.messageHistory[1]).toBe('player-assigned');
  expect(io.messageHistory[2]).toBe('player-assigned');
  expect(io.messageHistory[3]).toBe('player-assigned');
  expect(io.messageHistory[4]).toBe('player-assigned');
  expect(io.messageHistory[5]).toBe('players-updated');
  expect(io.messageHistory[6]).toBe('players-updated'); // Updated message again because of the emit to all with vote
  expect(io.messageHistory[7]).toBe('room-updated');
});
