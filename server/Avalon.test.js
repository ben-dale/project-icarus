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
  expect(avalon.settings.morganaEnabled).toBe(false);
  expect(avalon.settings.percivalEnabled).toBe(false);
  expect(avalon.settings.oberonEnabled).toBe(false);

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'player-assigned').length).toBe(5);

  expect(io.objHistory.find(p => p.role && p.role == 'MERLIN').metadata.length).toBe(2);
  io.objHistory.filter(p => p.role && p.role == 'GUARD').forEach(p => expect(p.metadata.length).toBe(0));

  expect(io.objHistory.find(p => p.role && p.role == 'ASSASSIN').metadata.length).toBe(2);
  io.objHistory.filter(p => p.role && p.role == 'MINION').forEach(p => expect(p.metadata).toBeDefined());

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
  expect(avalon.settings.morganaEnabled).toBe(true);
  expect(avalon.settings.percivalEnabled).toBe(true);
  expect(avalon.settings.oberonEnabled).toBe(false);

  expect(io.messageHistory.filter(mh => mh == 'players-updated').length).toBe(1);
  expect(io.messageHistory.filter(mh => mh == 'player-assigned').length).toBe(5);

  expect(io.objHistory.find(p => p.role && p.role == 'MERLIN').metadata.length).toBe(2);
  expect(io.objHistory.find(p => p.role && p.role == 'PERCIVAL').metadata.length).toBe(2);
  io.objHistory.filter(p => p.role && p.role == 'GUARD').forEach(p => expect(p.metadata.length).toBe(0));

  expect(io.objHistory.find(p => p.role && p.role == 'ASSASSIN').metadata.length).toBe(2);
  expect(io.objHistory.find(p => p.role && p.role == 'MORGANA').metadata.length).toBe(2);

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
  expect(avalon.settings.morganaEnabled).toBe(true);
  expect(avalon.settings.percivalEnabled).toBe(true);
  expect(avalon.settings.oberonEnabled).toBe(true);

  expect(io.messageHistory).toContain('players-updated');
  expect(io.messageHistory).toContain('player-assigned');
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

test('starts the game', () => {
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
  avalon.next(redisClient, io, allPlayers, roomId);

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
})

test('starts proposal vote', () => {
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
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new Player().init('1', 'player1', roomId).withProposalApproved(true),
    new Player().init('2', 'player2', roomId).withProposalApproved(true),
    new Player().init('3', 'player3', roomId).withProposalApproved(true),
    new Player().init('4', 'player4', roomId).withProposalApproved(true),
    new Player().init('5', 'player5', roomId).withProposalApproved(true)
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
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new Player().init('1', 'player1', roomId).withProposalApproved(true),
    new Player().init('2', 'player2', roomId).withProposalApproved(true),
    new Player().init('3', 'player3', roomId).withProposalApproved(true),
    new Player().init('4', 'player4', roomId).withProposalApproved(true),
    new Player().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_STARTED');
  expect(avalon.questLogs[0].playerIds).toStrictEqual(['1', '2']);
  expect(avalon.currentQuest.proposalAccepted).toBe(true);
});

test('starts quest result reveal', () => {
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
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new Player().init('1', 'player1', roomId).withProposalApproved(true),
    new Player().init('2', 'player2', roomId).withProposalApproved(true),
    new Player().init('3', 'player3', roomId).withProposalApproved(true),
    new Player().init('4', 'player4', roomId).withProposalApproved(true),
    new Player().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started
  const allPlayersWithQuestVote = new AllPlayers().init([
    new Player().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new Player().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new Player().init('3', 'player3', roomId),
    new Player().init('4', 'player4', roomId),
    new Player().init('5', 'player5', roomId)
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
  avalon.next(redisClient, io, allPlayers, roomId); // role reveal
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposing

  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('1');
  avalon.currentQuest = avalon.currentQuest.withProposedPlayerId('2');
  avalon.next(redisClient, io, allPlayers, roomId); // quest proposal

  const allPlayersWithVote = new AllPlayers().init([
    new Player().init('1', 'player1', roomId).withProposalApproved(true),
    new Player().init('2', 'player2', roomId).withProposalApproved(true),
    new Player().init('3', 'player3', roomId).withProposalApproved(true),
    new Player().init('4', 'player4', roomId).withProposalApproved(true),
    new Player().init('5', 'player5', roomId).withProposalApproved(true)
  ]);
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest proposal result
  avalon.next(redisClient, io, allPlayersWithVote, roomId); // quest started
  const allPlayersWithQuestVote = new AllPlayers().init([
    new Player().init('1', 'player1', roomId).withTeam('GOOD').withSucceedQuest(true),
    new Player().init('2', 'player2', roomId).withTeam('EVIL').withSucceedQuest(true),
    new Player().init('3', 'player3', roomId),
    new Player().init('4', 'player4', roomId),
    new Player().init('5', 'player5', roomId)
  ]);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // quest result reveal
  avalon.revealVote(0);
  avalon.revealVote(1);
  avalon.next(redisClient, io, allPlayersWithQuestVote, roomId); // next quest

  expect(avalon.screen).toBe('GAME');
  expect(avalon.state).toBe('QUEST_PROPOSING');
  expect(avalon.questLogs[0].result).toBe('SUCCEED');
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

test('returns 3 good players when there are 5 total players', () => {
  expect(new Avalon().goodPlayerCount(5)).toBe(3);
});

test('returns 6 good players when there are 10 total players', () => {
  expect(new Avalon().goodPlayerCount(10)).toBe(6);
});