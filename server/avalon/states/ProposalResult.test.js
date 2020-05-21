const ProposalResult = require('./ProposalResult');
const QuestLog = require('../models/QuestLog');
const Avalon = require('../Avalon');
const Player = require('../../common/models/Player');
const AllPlayers = require('../../common/models/AllPlayers');
const MockIo = require('../../mocks/MockIo');
const MockRedisClient = require('../../mocks/MockRedisClient');

test('start with rejected proposal', () => {
  // Given
  const avalon = new Avalon().init();

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new Player().init('1', 'player1', roomId).withProposalApproved(false),
    new Player().init('2', 'player2', roomId).withProposalApproved(false),
    new Player().init('3', 'player3', roomId).withProposalApproved(false),
    new Player().init('4', 'player4', roomId).withProposalApproved(false),
    new Player().init('5', 'player5', roomId).withProposalApproved(false)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new ProposalResult(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSAL_RESULT');
  expect(avalon.currentQuest.proposalAccepted).toBe(false);

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();
  
  redisClient.setValueHistory.forEach(v => {
    const player = new Player().fromRawObject(JSON.parse(v));
    expect(player.ready).toBe(false);
  });
});

test('start with approved proposal', () => {
  // Given
  const avalon = new Avalon().init();
  avalon.questLogs[0] = new QuestLog().init(1, 2);
  avalon.currentQuest.proposedPlayerIds = ['4', '5'];

  const roomId = 'roomId';
  const redisClient = new MockRedisClient();
  const io = new MockIo();
  const players = [
    new Player().init('1', 'player1', roomId).withProposalApproved(true),
    new Player().init('2', 'player2', roomId).withProposalApproved(true),
    new Player().init('3', 'player3', roomId).withProposalApproved(true),
    new Player().init('4', 'player4', roomId).withProposalApproved(false),
    new Player().init('5', 'player5', roomId).withProposalApproved(false)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new ProposalResult(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSAL_RESULT');
  expect(avalon.currentQuest.proposalAccepted).toBe(true);
  expect(avalon.questLogs[0].playerIds).toStrictEqual(['4', '5']);

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(redisClient.setKeyHistory.length).toBe(5);
  expect(redisClient.setValueHistory.length).toBe(5);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();
  
  redisClient.setValueHistory.forEach(v => {
    const player = new Player().fromRawObject(JSON.parse(v));
    expect(player.ready).toBe(false);
  });
});