const AvalonSocket = require('./AvalonSocket');
const Player = require('../common/models/Player');
const Room = require('../common/models/Room');
const AllPlayers = require('../common/models/AllPlayers');
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

// playerUpdated(io, redisClient, socket, data) {
//   console.log(data);
//   if (data) {
//     new Player().getFromRedis(redisClient, socket.id, (player) => {
//       let updatedPlayer = player.copy();
//       if (data.hasOwnProperty('ready')) {
//         updatedPlayer = updatedPlayer.withReady(data.ready);
//       }

//       if (data.hasOwnProperty('approveProposal')) {
//         updatedPlayer = updatedPlayer.withProposalApproved(data.approveProposal);
//       }

//       if (data.hasOwnProperty('succeedQuest')) {
//         updatedPlayer = updatedPlayer.withSucceedQuest(data.succeedQuest);
//       }

//       updatedPlayer.storeInRedis(redisClient);
//       updatedPlayer.emitToAll(io);

//       new Room().getFromRedis(redisClient, updatedPlayer.roomId, (room) => {
//         new AllPlayers().getFromRedis(redisClient, room.playerIds, (allPlayers) => {
//           if (allPlayers.areReady() && room.hasEnoughPlayers()) { // Need to put in a condition to stop play if a player leaves
//             room.game.next(redisClient, io, allPlayers, room.id); // This mutates the game instance which is grim
//             room.storeInRedis(redisClient);
//             room.emitToAll(io);
//           }
//         }, () => { });
//       }, () => { });
//     }, () => { });
//   }
// }

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
  const data = { };

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