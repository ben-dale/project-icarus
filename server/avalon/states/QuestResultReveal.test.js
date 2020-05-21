const QuestResultReveal = require('./QuestResultReveal');
const Avalon = require('../Avalon');
const Player = require('../../common/models/Player');
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
    new Player().init('1', 'player1', roomId).withReady(true).withSucceedQuest(true),
    new Player().init('2', 'player2', roomId).withReady(true).withSucceedQuest(true),
    new Player().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new Player().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new Player().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
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
  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  redisClient.setValueHistory.forEach(v => {
    const player = new Player().fromRawObject(JSON.parse(v));
    expect(player.ready).toBe(false);
    expect(player.vote).toBe('');
  });
});


test('start with two sabotage votes', () => {
  // Given
  const avalon = new Avalon().init();

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new Player().init('1', 'player1', roomId).withReady(true).withTeam('EVIL').withSucceedQuest(false),
    new Player().init('2', 'player2', roomId).withReady(true).withTeam('EVIL').withSucceedQuest(false),
    new Player().init('3', 'player3', roomId).withReady(true).withSucceedQuest(true),
    new Player().init('4', 'player4', roomId).withReady(true).withSucceedQuest(true),
    new Player().init('5', 'player5', roomId).withReady(true).withSucceedQuest(true)
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
  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  redisClient.setValueHistory.forEach(v => {
    const player = new Player().fromRawObject(JSON.parse(v));
    expect(player.ready).toBe(false);
    expect(player.vote).toBe('');
  });
});