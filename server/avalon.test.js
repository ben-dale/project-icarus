const avalon = require('./avalon');

class MockIo {
  constructor() {
    this.inId = "";
    this.message = "";
    this.obj = {};
  }

  in(roomId) {
    this.inId = roomId;
    return this;
  }

  emit(message, obj) {
    this.message = message;
    this.obj = obj;
  }
}

class MockRedis {
  constructor(dataToReturn) {
    this.dataToReturn = dataToReturn;
  }

  getObjects(keys, onSuccess) {
    this.keys = keys;
    onSuccess(this.dataToReturn)
  }
}

test('sends room information to all players', () => {
  let roomId = "kd93kr9j";
  let players = [{ id: '1', name: 'Ben', team: 'good', role: 'Merlin' }, { id: '2', name: 'Sam', team: 'evil', role: 'Assassin' }]
  let room = { owner: 'ownerId', settings: {}, game: {}, screen: 'screen' }
  let redis = new MockRedis(players);
  let io = new MockIo();

  avalon.sendRoomInformationToAll(redis, io, room, roomId);

  expect(io.inId).toBe('kd93kr9j');
  expect(io.message).toBe('room-updated');
  expect(io.obj).toStrictEqual({
    owner: 'ownerId',
    settings: {},
    game: {},
    screen: 'screen',
    players: [{ id: '1', name: 'Ben' }, { id: '2', name: 'Sam' }]
  })

});
