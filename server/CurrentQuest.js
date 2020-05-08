class CurrentQuest {

  fromRawObject(obj) {
    this.id = obj.id;
    this.requiredPlayers = obj.requiredPlayers;
    this.disagreements = obj.disagreements;
    this.organiserId = obj.organiserId;
    this.proposedPlayerIds = obj.proposedPlayerIds.slice();
    this.proposalAccepted = obj.proposalAccepted;
    this.votes = obj.votes.slice();
    this.result = obj.result;
    return this;
  }

  init(organiserId) {
    this.id = 1;
    this.requiredPlayers = 0;
    this.disagreements = 0;
    this.organiserId = organiserId;
    this.proposedPlayerIds = [];
    this.proposalAccepted = false;
    this.votes = [];
    this.result = '';
    return this;
  }

  copy() {
    let currentQuest = new CurrentQuest();
    currentQuest.id = this.id;
    currentQuest.requiredPlayers = this.requiredPlayers;
    currentQuest.disagreements = this.disagreements;
    currentQuest.organiserId = this.organiserId;
    currentQuest.proposedPlayerIds = this.proposedPlayerIds.slice();
    currentQuest.proposalAccepted = this.proposalAccepted;
    currentQuest.votes = this.votes.slice();
    currentQuest.result = this.result;
    return currentQuest;
  }

  withRequiredPlayers(requiredPlayers) {
    const copy = this.copy();
    copy.requiredPlayers = requiredPlayers;
    return copy;
  }

  withOrganiserId(organiserId) {
    const copy = this.copy();
    copy.organiserId = organiserId;
    return copy;
  }

  withSabotageVote() {
    const copy = this.copy();
    copy.votes.push({ choice: 'SABOTAGE', revealed: false });
    return copy;
  }

  withSucceedVote() {
    const copy = this.copy();
    copy.votes.push({ choice: 'SUCCEED', revealed: false });
    return copy;
  }

  shuffleVotes() {
    const copyOfVotes = this.votes.slice();
    for (let i = copyOfVotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyOfVotes[i], copyOfVotes[j]] = [copyOfVotes[j], copyOfVotes[i]];
    }
    const copy = this.copy();
    copy.votes = copyOfVotes.slice();
    return copy;
  }

  withDisagreement() {
    const copy = this.copy();
    copy.disagreements = copy.disagreements + 1;
    return copy;
  }

  withProposedPlayerId(playerId) {
    const copy = this.copy();
    copy.proposedPlayerIds.push(playerId);
    return copy;
  }

  removeProposedPlayerId(playerId) {
    const copy = this.copy();
    copy.proposedPlayerIds = copy.proposedPlayerIds.filter(id => id != playerId);
    return copy;
  }

  hasProposedPlayerId(playerId) {
    return this.proposedPlayerIds.filter(pid => pid == playerId).length != 0;
  }

  withAcceptedProposal(proposalAccepted) {
    const copy = this.copy();
    copy.proposalAccepted = proposalAccepted;
    return copy;
  }

  revealVote(index) {
    const copy = this.copy();
    if (index < copy.votes.length && index >= 0) {
      copy.votes[index].revealed = true;
    }
    return copy;
  }

  withResult() {
    const copy = this.copy();
    if (copy.votes.filter(v => !v.revealed).length > 0) {
      return copy;
    }
    const failedQuest = copy.votes.filter(v => v.choice == 'SABOTAGE').length > 0;
    failedQuest ? copy.result = 'FAIL' : copy.result = 'SUCCEED';
    return copy;
  }

  allVotesRevealed() {
    return this.votes.filter(v => v.revealed).length == this.votes.length;
  }

  startNextQuest(organiserId, requiredPlayers) {
    const copy = this.copy();
    copy.organiserId = organiserId;
    copy.id = copy.id + 1;
    copy.requiredPlayers = requiredPlayers;
    copy.votes = [];
    copy.result = '';
    copy.proposedPlayerIds = [];
    copy.proposalAccepted = false;
    copy.disagreements = 0;
    return copy;
  }

  withOnlyRevealedVotes() {
    const copy = this.copy();
    copy.votes = copy.votes.map(v => v.revealed ? v : { choice: '', revealed: false })
    return copy;
  }

}

module.exports = CurrentQuest;