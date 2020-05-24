const AvalonSocket = require('./AvalonSocket');
const Player = require('../common/models/Player');
const Room = require('../common/models/Room');
const AllPlayers = require('../common/models/AllPlayers');
const MockRedisClient = require('../mocks/MockRedisClient');
const MockIo = require('../mocks/MockIo')

test('blah', () => {
  const avalonSocket = new AvalonSocket();
  const socket = { id: 'socketId' };
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  // const player = new Player().init('socketId', 'Ben', 'roomId');
  // const room = new Room().init('roomId');
  // const allPlayers = new AllPlayers().init([player]);

  // allPlayers.storeInRedis(redisClient);
  // room.storeInRedis(redisClient);
  // player.storeInRedis(redisClient);


  // avalonSocket.playerDisconnected(io, redisClient, socket);
})