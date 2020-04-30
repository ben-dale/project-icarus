const avalon = require('./avalon');
const MockIo = require('./mocks/MockIo');
const MockRedis = require('./mocks/MockRedis');

test('sends room information to all players', () => {
  let roomId = "kd93kr9j";
  let players = [{ id: '1', name: 'Ben', team: 'good', role: 'Merlin' }, { id: '2', name: 'Sam', team: 'evil', role: 'Assassin' }]
  let room = { ownerId: 'ownerId', settings: {}, game: {}, screen: 'screen' }
  let redis = new MockRedis(players);
  let io = new MockIo();

  avalon.sendRoomInformationToAll(redis, io, room, roomId);

  expect(io.inId).toBe('kd93kr9j');
  expect(io.message).toBe('room-updated');
  expect(io.obj).toStrictEqual({
    ownerId: 'ownerId',
    settings: {},
    game: {},
    screen: 'screen',
    players: [{ id: '1', name: 'Ben' }, { id: '2', name: 'Sam' }]
  })

});