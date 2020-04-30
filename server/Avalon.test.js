const Avalon = require('./Avalon');

test('generates a new game object for five players', () => {
  let playerIds = ['1','2','3','4','5']

  let avalon = new Avalon(playerIds);
  avalon.startGame();

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.members.length).toBe(currentLog.required);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiser).toBe('');
    expect(currentLog.requiresDoubleFail).toBe(false);
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe("ROLE_REVEAL");
  expect(avalon.state).toBe("QUEST_PROPOSING");
  expect(playerIds.map(p => p.id)).toContain(avalon.activeQuest.organiser);
  expect(avalon.activeQuest.id).toBe(1);
  expect(avalon.activeQuest.disagreements).toBe(0);
  expect(avalon.activeQuest.proposedMembers).toStrictEqual([]);
  expect(avalon.activeQuest.proposalAccepted).toBe(false);
  expect(avalon.activeQuest.requiresDoubleFail).toBe(false);
  expect(avalon.activeQuest.result).toBe('');
});

test('generates a new game object for six players', () => {
  let playerIds = ['1','2','3','4','5','6']

  let avalon = new Avalon(playerIds);
  avalon.startGame();

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.members.length).toBe(currentLog.required);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiser).toBe('');
    expect(currentLog.requiresDoubleFail).toBe(false);
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe("ROLE_REVEAL");
  expect(avalon.state).toBe("QUEST_PROPOSING");
  expect(playerIds.map(p => p.id)).toContain(avalon.activeQuest.organiser);
  expect(avalon.activeQuest.id).toBe(1);
  expect(avalon.activeQuest.disagreements).toBe(0);
  expect(avalon.activeQuest.proposedMembers).toStrictEqual([]);
  expect(avalon.activeQuest.proposalAccepted).toBe(false);
  expect(avalon.activeQuest.requiresDoubleFail).toBe(false);
  expect(avalon.activeQuest.result).toBe('');
});

test('generates a new game object for ten players', () => {
  let playerIds = ['1','2','3','4','5','6','7','8','9','10']
  
  let avalon = new Avalon(playerIds);
  avalon.startGame();

  expect(avalon.questLogs.length).toBe(5);
  for (let i = 0; i < 5; i++) {
    let currentLog = avalon.questLogs[i];
    expect(currentLog.id).toBe(i + 1);
    expect(currentLog.members.length).toBe(currentLog.required);
    expect(currentLog.result).toBe('');
    expect(currentLog.organiser).toBe('');
    expect(currentLog.requiresDoubleFail).toBe(false);
  }
  expect(avalon.closed).toBe(true);
  expect(avalon.screen).toBe("ROLE_REVEAL");
  expect(avalon.state).toBe("QUEST_PROPOSING");
  expect(playerIds.map(p => p.id)).toContain(avalon.activeQuest.organiser);
  expect(avalon.activeQuest.id).toBe(1);
  expect(avalon.activeQuest.disagreements).toBe(0);
  expect(avalon.activeQuest.proposedMembers).toStrictEqual([]);
  expect(avalon.activeQuest.proposalAccepted).toBe(false);
  expect(avalon.activeQuest.requiresDoubleFail).toBe(false);
  expect(avalon.activeQuest.result).toBe('');
});

test('returns 3 good players when there are 5 total players', () => {
  let playerIds = ['1','2','3','4','5'];

  expect(new Avalon(playerIds).goodPlayerCount()).toBe(3);
});

test('returns 6 good players when there are 10 total players', () => {
  let playerIds = ['1','2','3','4','5','6','7','8','9','10'];

  expect(new Avalon(playerIds).goodPlayerCount()).toBe(6);
});

test('returns 2 evil players when there are 5 total players', () => {
  let playerIds = ['1','2','3','4','5'];

  expect(new Avalon(playerIds).evilPlayerCount()).toBe(2);
});

test('returns 4 evil players when there are 10 total players', () => {
  let playerIds = ['1','2','3','4','5','6','7','8','9','10'];

  expect(new Avalon(playerIds).evilPlayerCount()).toBe(4);
});