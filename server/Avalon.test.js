const Avalon = require('./Avalon');
const Settings = require('./Settings');
const CurrentQuest = require('./CurrentQuest');
const AllPlayers = require('./AllPlayers');
const Player = require('./Player');
const QuestLog = require('./QuestLog');
const MockRedisClient = require('./mocks/MockRedisClient');
const MockIo = require('./mocks/MockIo')

test('init instance', () => {
  const avalon = new Avalon().init();

  expect(avalon.closed).toBe(false);
  expect(avalon.screen).toBe('LOBBY');
  expect(avalon.state).toBe('');
  expect(avalon.questLogs).toStrictEqual([]);
  expect(avalon.settings).toStrictEqual(new Settings().init());
  expect(avalon.currentQuest).toStrictEqual(new CurrentQuest().init(''));
});

test('starts role reveal for five players', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new Player().init('1', 'player1', roomId),
    new Player().init('2', 'player2', roomId),
    new Player().init('3', 'player3', roomId),
    new Player().init('4', 'player4', roomId),
    new Player().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.next(redisClient, io, allPlayers, roomId);

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe('');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(avalon.settings.morganaEnabled).toBe(false);
  expect(avalon.settings.percivalEnabled).toBe(false);
  expect(avalon.settings.oberonEnabled).toBe(false);

  expect(io.message).toBe('players-updated');
  expect(io.inId).toBe('293jd9');
  expect(io.obj).toBeDefined();

  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(3);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(2);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(0);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(0);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(2);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MINION').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(0);
});

test('starts role reveal for five players with percival and morgana', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new Player().init('1', 'player1', roomId),
    new Player().init('2', 'player2', roomId),
    new Player().init('3', 'player3', roomId),
    new Player().init('4', 'player4', roomId),
    new Player().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId);

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe('');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(avalon.settings.morganaEnabled).toBe(true);
  expect(avalon.settings.percivalEnabled).toBe(true);
  expect(avalon.settings.oberonEnabled).toBe(false);

  expect(io.message).toBe('players-updated');
  expect(io.inId).toBe('293jd9');
  expect(io.obj).toBeDefined();

  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(3);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(2);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MINION').length).toBe(0);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(0);
});

test('starts role reveal for sevev players with percival and morgana and oberon', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new Player().init('1', 'player1', roomId),
    new Player().init('2', 'player2', roomId),
    new Player().init('3', 'player3', roomId),
    new Player().init('4', 'player4', roomId),
    new Player().init('5', 'player5', roomId),
    new Player().init('6', 'player6', roomId),
    new Player().init('7', 'player7', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.settings = avalon.settings.withOberonEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId);

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe('');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5', '6', '7']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(avalon.settings.morganaEnabled).toBe(true);
  expect(avalon.settings.percivalEnabled).toBe(true);
  expect(avalon.settings.oberonEnabled).toBe(true);

  expect(io.message).toBe('players-updated');
  expect(io.inId).toBe('293jd9');
  expect(io.obj).toBeDefined();

  expect(redisClient.setKeyHistory.length).toBe(7);
  expect(redisClient.setValueHistory.length).toBe(7);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(4);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(3);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(1);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(2);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'MINION').length).toBe(0);
  expect(redisClient.setValueHistory.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(1);
});

// test('starts role reveal for six players', () => {
//   const playerIds = ['1', '2', '3', '4', '5', '6']

//   const avalon = new Avalon().next(playerIds);

//   expect(avalon.questLogs.length).toBe(5);
//   for (let i = 0; i < 5; i++) {
//     const currentLog = avalon.questLogs[i];
//     expect(currentLog.id).toBe(i + 1);
//     expect(currentLog.playerIds).toStrictEqual([]);
//     expect(currentLog.result).toBe('');
//     expect(currentLog.organiserId).toBe('');
//   }
//   expect(avalon.closed).toBe(true);
//   expect(avalon.screen).toBe('ROLE_REVEAL');
//   expect(avalon.state).toBe('');
//   expect(playerIds).toContain(avalon.currentQuest.organiserId);
//   expect(avalon.currentQuest.id).toBe(1);
//   expect(avalon.currentQuest.disagreements).toBe(0);
//   expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
//   expect(avalon.currentQuest.proposalAccepted).toBe(false);
//   expect(avalon.currentQuest.votes).toStrictEqual([]);
//   expect(avalon.currentQuest.result).toBe('');
//   expect(avalon.settings.morganaEnabled).toBe(false);
//   expect(avalon.settings.percivalEnabled).toBe(false);
//   expect(avalon.settings.oberonEnabled).toBe(false);
// });

// test('starts role reveal for ten players', () => {
//   const playerIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

//   const avalon = new Avalon().next(playerIds);

//   expect(avalon.questLogs.length).toBe(5);
//   for (let i = 0; i < 5; i++) {
//     const currentLog = avalon.questLogs[i];
//     expect(currentLog.id).toBe(i + 1);
//     expect(currentLog.playerIds).toStrictEqual([]);
//     expect(currentLog.result).toBe('');
//     expect(currentLog.organiserId).toBe('');
//   }
//   expect(avalon.closed).toBe(true);
//   expect(avalon.screen).toBe('ROLE_REVEAL');
//   expect(avalon.state).toBe('');
//   expect(playerIds).toContain(avalon.currentQuest.organiserId);
//   expect(avalon.currentQuest.id).toBe(1);
//   expect(avalon.currentQuest.disagreements).toBe(0);
//   expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
//   expect(avalon.currentQuest.proposalAccepted).toBe(false);
//   expect(avalon.currentQuest.votes).toStrictEqual([]);
//   expect(avalon.currentQuest.result).toBe('');
//   expect(avalon.settings.morganaEnabled).toBe(false);
//   expect(avalon.settings.percivalEnabled).toBe(false);
//   expect(avalon.settings.oberonEnabled).toBe(false);
// });

test('create instance from raw object', () => {
  const rawObject = {
    state: 'QUEST_PROPOSING',
    screen: 'ROLE_REVEAL',
    closed: true,
    questLogs: [
      { id: 1, requiredPlayers: 2, organiserId: '2nfp4', playerIds: [], result: '' }
    ],
    settings: {
      morganaEnabled: true,
      oberonEnabled: true,
      percivalEnabled: true
    },
    currentQuest: {
      id: 1,
      disagreements: 0,
      organiserId: '393f93',
      proposedPlayerIds: [],
      proposalAccepted: false,
      result: '',
      votes: []
    }
  }

  const avalon = new Avalon().fromRawObject(rawObject);

  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.questLogs.length).toBe(1);
  expect(avalon.questLogs[0]).toStrictEqual(new QuestLog().init(1, 2).withOrganiserId('2nfp4').withResult(''));
  expect(avalon.settings).toStrictEqual(new Settings().withMorganaEnabled(true).withOberonEnabled(true).withPercivalEnabled(true));
  expect(avalon.currentQuest).toStrictEqual(new CurrentQuest().init('393f93'));
});

test('returns 3 good players when there are 5 total players', () => {
  expect(new Avalon().goodPlayerCount(5)).toBe(3);
});

test('returns 6 good players when there are 10 total players', () => {
  expect(new Avalon().goodPlayerCount(10)).toBe(6);
});