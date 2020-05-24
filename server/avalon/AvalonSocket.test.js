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
})