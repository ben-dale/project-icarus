const avalon = require('./avalon');
const MockIo = require('./mocks/MockIo');
const MockRedis = require('./mocks/MockRedis');

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

test('generates a new game object for five players', () => {
  let players = [
    { id: '1', name: 'Ben' },
    { id: '2', name: 'Sam' },
    { id: '3', name: 'Sidd' },
    { id: '4', name: 'Rodney' },
    { id: '5', name: 'Adam' }
  ]
  let room = { players: players };

  let gameObject = avalon.generateNewGameObject(room);

  expect(gameObject.questLog.logs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = gameObject.questLog.logs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.members.length).toBe(currentLog.required);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiser).toBe('');
    expect(currentLog.requiresDoubleFail).toBe(false);
  }
  expect(gameObject.state).toBe("questProposing");
  expect(players.map(p => p.id)).toContain(gameObject.activeQuest.organiser);
  expect(gameObject.activeQuest.id).toBe(1);
  expect(gameObject.activeQuest.disagreements).toBe(0);
  expect(gameObject.activeQuest.proposedMembers).toStrictEqual([]);
  expect(gameObject.activeQuest.proposalAccepted).toBe(false);
  expect(gameObject.activeQuest.requiresDoubleFail).toBe(false);
  expect(gameObject.activeQuest.result).toBe('');
});

test('generates a new game object for six players', () => {
  let players = [
    { id: '1', name: 'Ben' },
    { id: '2', name: 'Sam' },
    { id: '3', name: 'Sidd' },
    { id: '4', name: 'Rodney' },
    { id: '5', name: 'Adam' },
    { id: '6', name: 'Ben1' }
  ]
  let room = { players: players };

  let gameObject = avalon.generateNewGameObject(room);

  expect(gameObject.questLog.logs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = gameObject.questLog.logs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.members.length).toBe(currentLog.required);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiser).toBe('');
    expect(currentLog.requiresDoubleFail).toBe(false);
  }
  expect(gameObject.state).toBe("questProposing");
  expect(players.map(p => p.id)).toContain(gameObject.activeQuest.organiser);
  expect(gameObject.activeQuest.id).toBe(1);
  expect(gameObject.activeQuest.disagreements).toBe(0);
  expect(gameObject.activeQuest.proposedMembers).toStrictEqual([]);
  expect(gameObject.activeQuest.proposalAccepted).toBe(false);
  expect(gameObject.activeQuest.requiresDoubleFail).toBe(false);
  expect(gameObject.activeQuest.result).toBe('');
});

test('generates a new game object for ten players', () => {
  let players = [
    { id: '1', name: 'Ben' },
    { id: '2', name: 'Sam' },
    { id: '3', name: 'Sidd' },
    { id: '4', name: 'Rodney' },
    { id: '5', name: 'Adam' },
    { id: '6', name: 'Ben1' },
    { id: '7', name: 'Sam1' },
    { id: '8', name: 'Sidd1' },
    { id: '9', name: 'Rodney1' },
    { id: '10', name: 'Adam1' }
  ]
  let room = { players: players };

  let gameObject = avalon.generateNewGameObject(room);

  expect(gameObject.questLog.logs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = gameObject.questLog.logs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.members.length).toBe(currentLog.required);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiser).toBe('');
    expect(currentLog.requiresDoubleFail).toBe(false);
  }
  expect(gameObject.state).toBe("questProposing");
  expect(players.map(p => p.id)).toContain(gameObject.activeQuest.organiser);
  expect(gameObject.activeQuest.id).toBe(1);
  expect(gameObject.activeQuest.disagreements).toBe(0);
  expect(gameObject.activeQuest.proposedMembers).toStrictEqual([]);
  expect(gameObject.activeQuest.proposalAccepted).toBe(false);
  expect(gameObject.activeQuest.requiresDoubleFail).toBe(false);
  expect(gameObject.activeQuest.result).toBe('');
});