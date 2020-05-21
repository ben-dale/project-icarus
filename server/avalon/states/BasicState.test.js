const BasicState = require('./BasicState');
const Avalon = require('../Avalon');
const Player = require('../../common/models/Player');
const AllPlayers = require('../../common/models/AllPlayers');
const MockIo = require('../../mocks/MockIo');
const MockRedisClient = require('../../mocks/MockRedisClient');

test('create BasicState, reset player statuses and emit', () => {
  // Given
  const avalon = new Avalon().init();
  const roomId = 'roomId';
  const allPlayers = new AllPlayers().init([
    new Player().init('1', 'player1', roomId),
    new Player().init('2', 'player2', roomId),
    new Player().init('3', 'player3', roomId),
    new Player().init('4', 'player4', roomId),
    new Player().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  // When
  new BasicState(avalon, 'GAME', 'QUEST_PROPOSING').resetPlayersAndEmit(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);
  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
});


test('create BasicState with result', () => {
  // Given
  const avalon = new Avalon().init();

  // When
  new BasicState(avalon, 'GAME', 'GAME_OVER').withResult('EVIL');

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('GAME_OVER');
  expect(avalon.result).toBe('EVIL');
});