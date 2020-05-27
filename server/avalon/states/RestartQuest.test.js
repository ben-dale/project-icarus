const RestartQuest = require('./RestartQuest');
const QuestLog = require('../models/QuestLog');
const Avalon = require('../Avalon');
const AvalonPlayer = require('../models/AvalonPlayer');
const AllPlayers = require('../../common/models/AllPlayers');
const MockIo = require('../../mocks/MockIo');
const MockRedisClient = require('../../mocks/MockRedisClient');

test('start', () => {
  // Given
  const avalon = new Avalon().init();
  avalon.currentQuest = avalon.currentQuest.withOrganiserId('2').withRequiredPlayers(3);
  avalon.questLogs[0] = new QuestLog().init(1, 2);

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RestartQuest(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.currentQuest.organiserId).toBe('3');
  expect(avalon.currentQuest.disagreements).toBe(1);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.requiredPlayers).toBe(3);

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(5);
  new AvalonPlayer().getFromRedis(redisClient, '1', (p) => { expect(p.ready).toBe(false); expect(p.vote).toBe('') });
  new AvalonPlayer().getFromRedis(redisClient, '2', (p) => { expect(p.ready).toBe(false); expect(p.vote).toBe('') });
  new AvalonPlayer().getFromRedis(redisClient, '3', (p) => { expect(p.ready).toBe(false); expect(p.vote).toBe('') });
  new AvalonPlayer().getFromRedis(redisClient, '4', (p) => { expect(p.ready).toBe(false); expect(p.vote).toBe('') });
  new AvalonPlayer().getFromRedis(redisClient, '5', (p) => { expect(p.ready).toBe(false); expect(p.vote).toBe('') });
});


test('start with next organiser first player', () => {
  // Given
  const avalon = new Avalon().init();
  avalon.currentQuest = avalon.currentQuest.withOrganiserId('5').withRequiredPlayers(3);
  avalon.questLogs[0] = new QuestLog().init(1, 2);

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RestartQuest(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.currentQuest.organiserId).toBe('1');
});

test('start with game over status', () => {
  const avalon = new Avalon().init();
  avalon.questLogs[0] = new QuestLog().init(1, 2);
  avalon.currentQuest = avalon.currentQuest
    .withOrganiserId('5')
    .withRequiredPlayers(3)
    .withDisagreement()
    .withDisagreement()
    .withDisagreement()
    .withDisagreement()
    .withDisagreement();

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new RestartQuest(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('GAME_OVER');
  expect(avalon.result).toBe('EVIL');
});