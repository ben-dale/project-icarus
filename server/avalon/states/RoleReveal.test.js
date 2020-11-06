const RoleReveal = require('./RoleReveal');
const Avalon = require('../models/Avalon');
const AvalonPlayer = require('../models/AvalonPlayer');
const AllPlayers = require('../../common/models/AllPlayers');
const MockIo = require('../../mocks/MockIo');
const MockRedisClient = require('../../mocks/MockRedisClient');

test('start', () => {
  // Given
  const avalon = new Avalon().init();

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RoleReveal(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe(i == 0 ? avalon.currentQuest.organiserId : '');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.requiredPlayers).toBe(2);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'player-assigned').length).toBe(5);

  expect(io.objHistory.find(p => p.role && p.role == 'MERLIN').metadata.length).toBe(2);
  io.objHistory.filter(p => p.role && p.role == 'GUARD').forEach(p => expect(p.metadata.length).toBe(0));

  expect(io.objHistory.find(p => p.role && p.role == 'ASSASSIN').metadata.length).toBe(2);
  io.objHistory.filter(p => p.role && p.role == 'MINION').forEach(p => expect(p.metadata).toBeDefined());

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(5);
  expect(redisClient.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(3);
  expect(redisClient.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(2);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(0);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(0);
  expect(redisClient.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(2);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MINION').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(0);
});

test('start with percival and morgana', () => {
  // Given
  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RoleReveal(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe(i == 0 ? avalon.currentQuest.organiserId : '');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.requiredPlayers).toBe(2);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'player-assigned').length).toBe(5);

  expect(io.objHistory.find(p => p.role && p.role == 'MERLIN').metadata.length).toBe(2);
  expect(io.objHistory.find(p => p.role && p.role == 'PERCIVAL').metadata.length).toBe(2);
  io.objHistory.filter(p => p.role && p.role == 'GUARD').forEach(p => expect(p.metadata.length).toBe(0));

  expect(io.objHistory.find(p => p.role && p.role == 'ASSASSIN').metadata.length).toBe(2);
  expect(io.objHistory.find(p => p.role && p.role == 'MORGANA').metadata.length).toBe(2);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(5);
  expect(redisClient.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(3);
  expect(redisClient.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(2);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MINION').length).toBe(0);
  expect(redisClient.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(0);
});


test('start with percival and oberon', () => {
  // Given
  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withOberonEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RoleReveal(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe(i == 0 ? avalon.currentQuest.organiserId : '');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.requiredPlayers).toBe(2);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'player-assigned').length).toBe(5);

  expect(io.objHistory.find(p => p.role && p.role == 'MERLIN').metadata.length).toBe(2);
  expect(io.objHistory.find(p => p.role && p.role == 'PERCIVAL').metadata.length).toBe(1);
  io.objHistory.filter(p => p.role && p.role == 'GUARD').forEach(p => expect(p.metadata.length).toBe(0));

  expect(io.objHistory.find(p => p.role && p.role == 'ASSASSIN').metadata.length).toBe(1);
  expect(io.objHistory.find(p => p.role && p.role == 'OBERON').metadata.length).toBe(2);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(5);
  expect(redisClient.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(3);
  expect(redisClient.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(2);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(0);
  expect(redisClient.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MINION').length).toBe(0);
  expect(redisClient.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(1);
});


test('start with percival, morgana and oberon', () => {
  // Given
  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.settings = avalon.settings.withOberonEnabled(true);

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
    new AvalonPlayer().init('6', 'player6', roomId),
    new AvalonPlayer().init('7', 'player7', roomId)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RoleReveal(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    const currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe(i == 0 ? avalon.currentQuest.organiserId : '');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('ROLE_REVEAL');
  expect(avalon.state).toBe('');
  expect(['1', '2', '3', '4', '5', '6', '7']).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.requiredPlayers).toBe(2);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');

  expect(io.messageHistory).toContain('players-updated');
  expect(io.messageHistory).toContain('player-assigned');
  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(7);
  expect(redisClient.filter(p => JSON.parse(p).team == 'GOOD').length).toBe(4);
  expect(redisClient.filter(p => JSON.parse(p).team == 'EVIL').length).toBe(3);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MERLIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'ASSASSIN').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'PERCIVAL').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MORGANA').length).toBe(1);
  expect(redisClient.filter(p => JSON.parse(p).role == 'GUARD').length).toBe(2);
  expect(redisClient.filter(p => JSON.parse(p).role == 'MINION').length).toBe(0);
  expect(redisClient.filter(p => JSON.parse(p).role == 'OBERON').length).toBe(1);
});