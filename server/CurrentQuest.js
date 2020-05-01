class CurrentQuest {

  fromRawObject(obj) {
    let currentQuest = new CurrentQuest();
    currentQuest.id = obj.id;
    currentQuest.disagreements = obj.disagreements;
    currentQuest.organiserId = obj.organiserId;
    currentQuest.proposedPlayerIds = obj.proposedPlayerIds.slice();
    currentQuest.proposalAccepted = obj.proposalAccepted;
    currentQuest.votes = obj.votes.slice();
    currentQuest.result = obj.result;
    return currentQuest;
  }

  init(organiserId) {
    let currentQuest = new CurrentQuest();
    currentQuest.id = 1;
    currentQuest.disagreements = 0;
    currentQuest.organiserId = organiserId;
    currentQuest.proposedPlayerIds = [];
    currentQuest.proposalAccepted = false;
    currentQuest.votes = [];
    currentQuest.result = '';
    return currentQuest;
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