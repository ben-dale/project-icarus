const AvalonRules = require('./AvalonRules')

test('returns 3 good players and 2 evil players when there are 5 total players', () => {
  const avalonRules = new AvalonRules(5);

  expect(avalonRules.numberOfGoodPlayers()).toBe(3);
  expect(avalonRules.numberOfEvilPlayers()).toBe(2);
});

test('returns 6 good players and 4 evil players when there are 10 total players', () => {
  const avalonRules = new AvalonRules(10);

  expect(avalonRules.numberOfGoodPlayers()).toBe(6);
  expect(avalonRules.numberOfEvilPlayers()).toBe(4);
});

test('returns 2 when getting players required for quest 1 with 5 players', () => {
  const avalonRules = new AvalonRules(5);

  expect(avalonRules.numberOfPlayersRequiredForQuest(0)).toBe(2);
});

test('returns 3 when getting players required for quest 2 with 5 players', () => {
  const avalonRules = new AvalonRules(5);

  expect(avalonRules.numberOfPlayersRequiredForQuest(1)).toBe(3);
});

test('returns 5 when getting players required for quest 4 with 10 players', () => {
  const avalonRules = new AvalonRules(10);

  expect(avalonRules.numberOfPlayersRequiredForQuest(3)).toBe(5);
});