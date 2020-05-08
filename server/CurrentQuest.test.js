const CurrentQuest = require('./CurrentQuest');

test('create instance from raw object', () => {
  const rawObject = {
    id: 1,
    disagreements: 0,
    organiserId: '123',
    proposedPlayerIds: ['444', '555'],
    proposalAccepted: true,
    votes: [{ choice: 'SABOTAGE', revealed: false }],
    result: 'FAIL'
  }

  const currentQuest = new CurrentQuest().fromRawObject(rawObject);

  expect(currentQuest.id).toBe(1);
  expect(currentQuest.disagreements).toBe(0);
  expect(currentQuest.organiserId).toBe('123');
  expect(currentQuest.proposedPlayerIds).toStrictEqual(['444', '555']);
  expect(currentQuest.proposalAccepted).toBe(true);
  expect(currentQuest.votes).toStrictEqual([{ choice: 'SABOTAGE', revealed: false }]);
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

  expect(currentQuest.organiserId).toBe('555');
});

test('add SABOTAGE vote to votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote();

  expect(currentQuest.votes).toStrictEqual([{ choice: 'SABOTAGE', revealed: false }]);
});

test('add SUCCEED vote to votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSucceedVote();

  expect(currentQuest.votes).toStrictEqual([{ choice: 'SUCCEED', revealed: false }]);
});

test('increment disagreement count', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withDisagreement();

  expect(currentQuest.disagreements).toBe(1);
});

test('add playerId to proposedPlayerIds', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withProposedPlayerId('555');

  expect(currentQuest.proposedPlayerIds).toStrictEqual(['555']);
});

test('remove playerId from proposedPlayerIds', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withProposedPlayerId('555').withProposedPlayerId('222');

  expect(currentQuest.removeProposedPlayerId('555').proposedPlayerIds).toStrictEqual(['222']);
});

test('set required players for quest', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withRequiredPlayers(3);

  expect(currentQuest.requiredPlayers).toBe(3);
});

test('mark proposal as accepted', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withAcceptedProposal(true);

  expect(currentQuest.proposalAccepted).toBe(true);
});

test('mark proposal as rejected', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withAcceptedProposal(false);

  expect(currentQuest.proposalAccepted).toBe(false);
});

test('reveal a vote', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote().revealVote(0);

  expect(currentQuest.votes).toStrictEqual([{ choice: 'SABOTAGE', revealed: true }]);
});

test('does not reveal a vote with an invalid index', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote().revealVote(1);

  expect(currentQuest.votes).toStrictEqual([{ choice: 'SABOTAGE', revealed: false }]);
});

test('returns true when all votes are revealed', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote().revealVote(0);

  expect(currentQuest.allVotesRevealed()).toBe(true);
});

test('does not work out result until all results are revealed', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote().withSucceedVote().withResult();

  expect(currentQuest.result).toBe('');
});

test('work out FAIL result of quest based on votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSabotageVote().withSucceedVote().revealVote(0).revealVote(1).withResult();

  expect(currentQuest.result).toBe('FAIL');
});

test('work out SUCCEED result of quest based on votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSucceedVote().withSucceedVote().revealVote(0).revealVote(1).withResult();

  expect(currentQuest.result).toBe('SUCCEED');
});

test('has proposed player id', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withProposedPlayerId("111");

  expect(currentQuest.hasProposedPlayerId("111")).toBe(true);
});

test('does not have proposed player id', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withProposedPlayerId("111");

  expect(currentQuest.hasProposedPlayerId("222")).toBe(false);
});

test('with no revealed votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSucceedVote().withSabotageVote().withOnlyRevealedVotes();

  expect(currentQuest.votes).toStrictEqual([{ choice: '', revealed: false }, { choice: '', revealed: false }]);
});

test('with one revealed votes', () => {
  const organiserId = '333';

  const currentQuest = new CurrentQuest().init(organiserId).withSucceedVote().withSabotageVote().revealVote(0).withOnlyRevealedVotes();

  expect(currentQuest.votes).toStrictEqual([{ choice: 'SUCCEED', revealed: true }, { choice: '', revealed: false }]);
});

test('starts next quest', () => {
  const rawObject = {
    id: 1,
    disagreements: 0,
    organiserId: '123',
    proposedPlayerIds: ['444', '555'],
    proposalAccepted: true,
    votes: [{ choice: 'SABOTAGE', revealed: false }],
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



