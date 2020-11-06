const ProposalResult = require('./ProposalResult');
const QuestLog = require('../models/QuestLog');
const Avalon = require('../models/Avalon');
const AvalonPlayer = require('../../avalon/models/AvalonPlayer');
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
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withProposalApproved(false),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withProposalApproved(false),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withProposalApproved(false),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withProposalApproved(false),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withProposalApproved(false)
  ];
  const allPlayers = new AllPlayers().init(players);

  // When
  new ProposalResult(avalon).start(redisClient, io, allPlayers, roomId);

  // Then
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSAL_RESULT');
  expect(avalon.currentQuest.proposalAccepted).toBe(false);

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(5);
  new AvalonPlayer().getFromRedis(redisClient, '1', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '2', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '3', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '4', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '5', (p) => { expect(p.ready).toBe(false) });
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
    new AvalonPlayer().init('1', 'player1', roomId).withReady(true).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withReady(true).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withReady(true).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withReady(true).withProposalApproved(false),
    new AvalonPlayer().init('5', 'player5', roomId).withReady(true).withProposalApproved(false)
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
  expect(redisClient.keyCount()).toBe(5);

  expect(io.inId).toBe(roomId);
  expect(io.obj).toBeDefined();

  expect(redisClient.keyCount()).toBe(5);
  new AvalonPlayer().getFromRedis(redisClient, '1', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '2', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '3', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '4', (p) => { expect(p.ready).toBe(false) });
  new AvalonPlayer().getFromRedis(redisClient, '5', (p) => { expect(p.ready).toBe(false) });
});