const Room = require('./Room');
const MockRedisClient = require('./mocks/MockRedisClient');

test('get from redis', () => {
  let result = { ownerId: '123', playerIds: ['222', '333'] }
  let redisClient = new MockRedisClient();
  redisClient.resultToReturn(result);

  let room = new Room();

  room.getFromRedis(redisClient, 'roomId', (result) => {
    expect(result.ownerId).toBe('123');
    expect(result.playerIds).toStrictEqual(['222', '333']);
  }, () => { });
});