const CurrentQuest = require('./CurrentQuest');

test('create instance from raw object', () => {
  const rawObject = {
    id: 1,
    disagreements: 0,
    organiserId: '123',
    proposedPlayerIds: ['444', '555'],
    proposalAccepted: true,
    votes: ['SUCCEED', 'SABOTAGE'],
    result: 'FAIL'
  }

  const currentQuest = new CurrentQuest().fromRawObject(rawObject);

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('123');
  expect(currentQuest.proposedPlayerIds).toStrictEqual(['444', '555']);
  expect(currentQuest.proposalAccepted).toBe(true);
  expect(currentQuest.votes).toStrictEqual(['SUCCEED', 'SABOTAGE']);
  expect(currentQuest.result).toBe('FAIL');
});

test('initialise new CurrentQuest instance', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId);

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual([]);
  expect(currentQuest.result).toBe('');
});

test('update organiserId', () => {
  const organiserId = '333';
  const newOrganiserId = '555';

  const currentQuest = new CurrentQuest().init(organiserId).withOrganiserId(newOrganiserId);

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('555');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual([]);
  expect(currentQuest.result).toBe('');
});

test('add SABOTAGE vote to votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual(['SABOTAGE']);
  expect(currentQuest.result).toBe('');
});

test('add SUCCEED vote to votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSucceedVote();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual(['SUCCEED']);
  expect(currentQuest.result).toBe('');
});

test('increment disagreement count', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withDisagreement();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(1);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual([]);
  expect(currentQuest.result).toBe('');
});

test('add playerId to proposedPlayerIds', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withDisagreement();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(1);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual([]);
  expect(currentQuest.result).toBe('');
});

test('mark proposal as accepted', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withAcceptedProposal();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(true);
  expect(currentQuest.votes).toStrictEqual([]);
  expect(currentQuest.result).toBe('');
});

test('work out FAIL result of quest based on votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote().withSucceedVote().withResult();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual(['SABOTAGE', 'SUCCEED']);
  expect(currentQuest.result).toBe('FAIL');
});

test('work out SUCCEED result of quest based on votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSucceedVote().withSucceedVote().withResult();

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('333');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual(['SUCCEED', 'SUCCEED']);
  expect(currentQuest.result).toBe('SUCCEED');
});

test('starts next quest', () => {
  const rawObject = {
    id: 1,
    disagreements: 0,
    organiserId: '123',
    proposedPlayerIds: ['444', '555'],
    proposalAccepted: true,
    votes: ['SUCCEED', 'SABOTAGE'],
    result: 'FAIL'
  }
  const nextOrganiserId = '444';

  const currentQuest = new CurrentQuest().fromRawObject(rawObject).startNextQuest(nextOrganiserId);

  expect(currentQuest.id).toBe(2);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('444');
  expect(currentQuest.proposedPlayerIds).toStrictEqual([]);
  expect(currentQuest.proposalAccepted).toBe(false);
  expect(currentQuest.votes).toStrictEqual([]);
  expect(currentQuest.result).toBe('');
});



