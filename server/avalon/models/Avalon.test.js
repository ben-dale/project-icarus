const Avalon = require('./Avalon');
const Settings = require('./Settings');
const CurrentQuest = require('./CurrentQuest');
const AllPlayers = require('../../common/models/AllPlayers');
const AvalonPlayer = require('./AvalonPlayer');
const QuestLog = require('./QuestLog');
const MockRedisClient = require('../../mocks/MockRedisClient');
const MockIo = require('../../mocks/MockIo')

test('init instance', () => {
  const avalon = new Avalon().init();

  expect(avalon.closed).toBe(false);
  expect(avalon.screen).toBe('LOBBY');
  expect(avalon.state).toBe('');
  expect(avalon.questLogs).toStrictEqual([]);
  expect(avalon.settings).toStrictEqual(new Settings().init());
  expect(avalon.currentQuest).toStrictEqual(new CurrentQuest().init(''));
});

test('starts the game', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId);
  avalon.next(redisClient, io, allPlayers, roomId);

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
})

test('starts proposal vote', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSAL');
});

test('starts proposal vote result', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSAL_RESULT');
  expect(avalon.questLogs[0].playerIds).toStrictEqual(['1', '2']);
  expect(avalon.currentQuest.proposalAccepted).toBe(true);
});

test('starts quest', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_STARTED');
  expect(avalon.questLogs[0].playerIds).toStrictEqual(['1', '2']);
  expect(avalon.currentQuest.proposalAccepted).toBe(true);
});


test('restarts quest', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(false),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(false),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(false),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  const previousOrganiserId = avalon.currentQuest.organiserId;
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest restarting
  const nextOrganiserId = previousOrganiserId == '5' ? '1' : '' + (parseInt(previousOrganiserId) + 1);

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.questLogs[0].playerIds).toStrictEqual([]);
  expect(avalon.questLogs[0].organiserId).toBe(nextOrganiserId);
  expect(avalon.currentQuest.disagreements).toBe(1);
});

test('game over with EVIL win when 5 disagreements', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(false),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(false),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(false),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest restarting

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest restarting

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest restarting

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest restarting

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest restarting
});

test('starts quest result reveal', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started
  const allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_RESULT_REVEAL');
  expect(avalon.questLogs[0].playerIds).toStrictEqual(['1', '2']);
  expect(avalon.currentQuest.proposalAccepted).toBe(true);
});


test('starts next quest', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started
  const allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.revealVote(0);
  avalon.revealVote(1);

  const previousOrganiserId = avalon.currentQuest.organiserId;
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest
  const nextOrganiserId = previousOrganiserId == '5' ? '1' : '' + (parseInt(previousOrganiserId) + 1);

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.questLogs[0].result).toBe('SUCCEED');
  expect(avalon.questLogs[1].organiserId).toBe(nextOrganiserId);
  expect(avalon.currentQuest.organiserId).toBe(nextOrganiserId);
  expect(avalon.currentQuest.id).toBe(2);
  expect(avalon.currentQuest.requiredPlayers).toBe(3);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
});



test('starts merlin id', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started
  let allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.revealVote(0);
  avalon.revealVote(1);

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('3');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest
  avalon.revealVote(0);
  avalon.revealVote(1);
  avalon.revealVote(2);

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest
  avalon.revealVote(0);
  avalon.revealVote(1);

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('MERLIN_ID');
});

test('starts merlin id', () => {
  const roomId = '293jd9';
  const allPlayers = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId),
    new AvalonPlayer().init('2', 'player2', roomId),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId),
  ]);
  const io = new MockIo();
  const redisClient = new MockRedisClient();

  const avalon = new Avalon().init();
  avalon.settings = avalon.settings.withMorganaEnabled(true);
  avalon.settings = avalon.settings.withPercivalEnabled(true);
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withProposalApproved(true),
    new AvalonPlayer().init('2', 'player2', roomId).withProposalApproved(true),
    new AvalonPlayer().init('3', 'player3', roomId).withProposalApproved(true),
    new AvalonPlayer().init('4', 'player4', roomId).withProposalApproved(true),
    new AvalonPlayer().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started
  let allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.revealVote(0);
  avalon.revealVote(1);

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('3');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest
  avalon.revealVote(0);
  avalon.revealVote(1);
  avalon.revealVote(2);

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  allPlayersWithQuestVote = new AllPlayers().init([
    new AvalonPlayer().init('1', 'player1', roomId).withTeam('GOOD').withRole('MERLIN').withSucceedQuest(true),
    new AvalonPlayer().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new AvalonPlayer().init('3', 'player3', roomId),
    new AvalonPlayer().init('4', 'player4', roomId),
    new AvalonPlayer().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest
  avalon.revealVote(0);
  avalon.revealVote(1);

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1')

  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('GAME_OVER');
  expect(avalon.result).toBe('EVIL');
});

test('create instance from raw object', () => {
  const rawObject = {
    state: 'QUEST_PROPOSING',
    screen: 'GAME',
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
      requiredPlayers: 0,
      result: '',
      votes: []
    }
  }

  const avalon = new Avalon().fromRawObject(rawObject);

  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.questLogs.length).toBe(1);
  expect(avalon.questLogs[0]).toStrictEqual(new QuestLog().init(1, 2).withOrganiserId('2nfp4').withResult(''));
  expect(avalon.settings).toStrictEqual(new Settings().withMorganaEnabled(true).withOberonEnabled(true).withPercivalEnabled(true));
  expect(avalon.currentQuest).toStrictEqual(new CurrentQuest().init('393f93'));
});
