const Avalon = require('./Avalon');

test('starts a new game for five players', () => {
  let playerIds = ['1','2','3','4','5']

  let avalon = new Avalon();
  avalon.startGame(playerIds);

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe('');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe("ROLE_REVEAL");
  expect(avalon.state).toBe("QUEST_PROPOSING");
  expect(playerIds).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(avalon.settings.morganaEnabled).toBe(false);
  expect(avalon.settings.percivalEnabled).toBe(false);
  expect(avalon.settings.oberonEnabled).toBe(false);
});

test('starts a new game for six players', () => {
  let playerIds = ['1','2','3','4','5','6']

  let avalon = new Avalon();
  avalon.startGame(playerIds);

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe('');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe("ROLE_REVEAL");
  expect(avalon.state).toBe("QUEST_PROPOSING");
  expect(playerIds).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(avalon.settings.morganaEnabled).toBe(false);
  expect(avalon.settings.percivalEnabled).toBe(false);
  expect(avalon.settings.oberonEnabled).toBe(false);
});

test('starts a new game for ten players', () => {
  let playerIds = ['1','2','3','4','5','6','7','8','9','10']
  
  let avalon = new Avalon();
  avalon.startGame(playerIds);

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.playerIds).toStrictEqual([]);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiserId).toBe('');
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe("ROLE_REVEAL");
  expect(avalon.state).toBe("QUEST_PROPOSING");
  expect(playerIds).toContain(avalon.currentQuest.organiserId);
  expect(avalon.currentQuest.id).toBe(1);
  expect(avalon.currentQuest.disagreements).toBe(0);
  expect(avalon.currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(avalon.currentQuest.proposalAccepted).toBe(false);
  expect(avalon.currentQuest.votes).toStrictEqual([]);
  expect(avalon.currentQuest.result).toBe('');
  expect(avalon.settings.morganaEnabled).toBe(false);
  expect(avalon.settings.percivalEnabled).toBe(false);
  expect(avalon.settings.oberonEnabled).toBe(false);
});

test('returns 3 good players when there are 5 total players', () => {
  let playerIds = ['1','2','3','4','5'];

  expect(new Avalon().goodPlayerCount(playerIds)).toBe(3);
});

test('returns 6 good players when there are 10 total players', () => {
  let playerIds = ['1','2','3','4','5','6','7','8','9','10'];

  expect(new Avalon().goodPlayerCount(playerIds)).toBe(6);
});

test('returns 2 evil players when there are 5 total players', () => {
  let playerIds = ['1','2','3','4','5'];

  expect(new Avalon().evilPlayerCount(playerIds)).toBe(2);
});

test('returns 4 evil players when there are 10 total players', () => {
  let playerIds = ['1','2','3','4','5','6','7','8','9','10'];

  expect(new Avalon().evilPlayerCount(playerIds)).toBe(4);
});