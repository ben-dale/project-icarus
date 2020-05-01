class CurrentQuest {

  fromRawObject(obj) {
    this.id = obj.id;
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
    currentQuest.disagreements = this.disagreements;
    currentQuest.organiserId = this.organiserId;
    currentQuest.proposedPlayerIds = this.proposedPlayerIds.slice();
    currentQuest.proposalAccepted = this.proposalAccepted;
    currentQuest.votes = this.votes.slice();
    currentQuest.result = this.result;
    return currentQuest;
  }

  withOrganiserId(organiserId) {
    const copy = this.copy();
    copy.organiserId = organiserId;
    return copy;
  }

  withSabotageVote() {
    const copy = this.copy();
    copy.votes.push('SABOTAGE');
    return copy;
  }

  withSucceedVote() {
    const copy = this.copy();
    copy.votes.push('SUCCEED');
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

  withAcceptedProposal() {
    const copy = this.copy();
    copy.proposalAccepted = true;
    return copy;
  }

  withResult() {
    const copy = this.copy();
    const failedQuest = copy.votes.filter(v => v == 'SABOTAGE').length > 0;
    failedQuest ? copy.result = 'FAIL' : copy.result = 'SUCCEED';
    return copy;
  }

  startNextQuest(organiserId) {
    const copy = this.copy();
    copy.organiserId = organiserId;
    copy.id = copy.id + 1;
    copy.votes = [];
    copy.result = '';
    copy.proposedPlayerIds = [];
    copy.proposalAccepted = false;
    copy.disagreements = 0;
    return copy;
  }
  
}

module.exports = CurrentQuest;