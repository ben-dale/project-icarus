const QuestLog = require('./QuestLog')

test('init blank QuestLog', () => {
  const questLog = new QuestLog().init(1, 3);

  expect(questLog.id).toBe(1);
  expect(questLog.requiredPlayers).toBe(3);
  expect(questLog.organiserId).toBe('');
  expect(questLog.playerIds).toStrictEqual([]);
  expect(questLog.result).toBe('');
});

test('create instance from raw object', () => {
  const obj = { id: 1, requiredPlayers: 3, organiserId: '4idi39', playerIds: ['aaa', 'bbb'], result: 'FAIL' }

  const questLog = new QuestLog().fromRawObject(obj);

  expect(questLog.id).toBe(1);
  expect(questLog.requiredPlayers).toBe(3);
  expect(questLog.organiserId).toBe('4idi39');
  expect(questLog.playerIds).toStrictEqual(['aaa', 'bbb']);
  expect(questLog.result).toBe('FAIL');
});

test('update organiserId', () => {
  const questLog = new QuestLog().init(1, 3).withOrganiserId('567');

  expect(questLog.id).toBe(1);
  expect(questLog.requiredPlayers).toBe(3);
  expect(questLog.organiserId).toBe('567');
  expect(questLog.playerIds).toStrictEqual([]);
  expect(questLog.result).toBe('');
});

test('add player', () => {
  const questLog = new QuestLog().init(1, 3).addPlayer('ggg')

  expect(questLog.id).toBe(1);
  expect(questLog.requiredPlayers).toBe(3);
  expect(questLog.organiserId).toBe('');
  expect(questLog.playerIds).toStrictEqual(['ggg']);
  expect(questLog.result).toBe('');
});

test('does not add player if no space', () => {
  const questLog = new QuestLog().init(1, 2).withResult('SUCCEED');

  expect(questLog.id).toBe(1);
  expect(questLog.requiredPlayers).toBe(2);
  expect(questLog.organiserId).toBe('');
  expect(questLog.playerIds).toStrictEqual([]);
  expect(questLog.result).toBe('SUCCEED');
});