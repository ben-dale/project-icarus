const QuestResultReveal = require('./QuestResultReveal');
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
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new QuestResultReveal(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_RESULT_REVEAL');
  expect(avalon.currentQuest.votes).toStrictEqual([
    { choice: 'SUCCEED', revealed: false },
    { choice: 'SUCCEED', revealed: false },
    { choice: 'SUCCEED', revealed: false },
    { choice: 'SUCCEED', revealed: false },
    { choice: 'SUCCEED', revealed: false }
  ])

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

test('start with two sabotage votes', () => {
  // Given
  const avalon = new Avalon().init();

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withTeam('EVIL').withSucceedQuest(false),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withTeam('EVIL').withSucceedQuest(false),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new QuestResultReveal(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_RESULT_REVEAL');
  expect(avalon.currentQuest.votes.filter(v => v.choice == 'SABOTAGE').length).toBe(2);
  expect(avalon.currentQuest.votes.filter(v => v.choice == 'SUCCEED').length).toBe(3);

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