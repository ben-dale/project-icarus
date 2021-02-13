const Settings = require('./Settings');

test('create instance from raw object', () => {
  const rawObject = {
    morganaEnabled: false,
    percivalEnabled: true,
    oberonEnabled: false,
    questLogEnabled: false
  }

  const settings = new Settings().fromRawObject(rawObject);

  expect(settings.oberonEnabled).toBe(false);
  expect(settings.percivalEnabled).toBe(true);
  expect(settings.morganaEnabled).toBe(false);
  expect(settings.questLogEnabled).toBe(false);
});

test('with Morgana enabled', () => {
  const settings = new Settings().init().withMorganaEnabled(true);

  expect(settings.oberonEnabled).toBe(false);
  expect(settings.percivalEnabled).toBe(false);
  expect(settings.morganaEnabled).toBe(true);
  expect(settings.questLogEnabled).toBe(false);
});

test('with Oberon enabled', () => {
  const settings = new Settings().init().withOberonEnabled(true);

  expect(settings.oberonEnabled).toBe(true);
  expect(settings.percivalEnabled).toBe(false);
  expect(settings.morganaEnabled).toBe(false);
  expect(settings.questLogEnabled).toBe(false);
});

test('with Percival enabled', () => {
  const settings = new Settings().init().withPercivalEnabled(true);

  expect(settings.oberonEnabled).toBe(false);
  expect(settings.percivalEnabled).toBe(true);
  expect(settings.morganaEnabled).toBe(false);
  expect(settings.questLogEnabled).toBe(false);
});

test('with quest log enabled', () => {
  const settings = new Settings().init().withQuestLogEnabled(true);

  expect(settings.oberonEnabled).toBe(false);
  expect(settings.percivalEnabled).toBe(false);
  expect(settings.morganaEnabled).toBe(false);
  expect(settings.questLogEnabled).toBe(true);
});
