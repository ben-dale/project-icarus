class Settings {

  init() {
    this.morganaEnabled = false;
    this.percivalEnabled = false;
    this.oberonEnabled = false;
    this.questLogEnabled = false;
    return this;
  }

  fromRawObject(obj) {
    this.morganaEnabled = obj.morganaEnabled;
    this.percivalEnabled = obj.percivalEnabled;
    this.oberonEnabled = obj.oberonEnabled;
    this.questLogEnabled = obj.questLogEnabled;
    return this;
  }

  copy() {
    const settings = new Settings();
    settings.morganaEnabled = this.morganaEnabled;
    settings.percivalEnabled = this.percivalEnabled;
    settings.oberonEnabled = this.oberonEnabled;
    settings.questLogEnabled = this.questLogEnabled;
    return settings;
  }

  withMorganaEnabled(morganaEnabled) {
    const copy = this.copy();
    copy.morganaEnabled = morganaEnabled;
    return copy;
  }

  withOberonEnabled(oberonEnabled) {
    const copy = this.copy();
    copy.oberonEnabled = oberonEnabled;
    return copy;
  }

  withPercivalEnabled(percivalEnabled) {
    const copy = this.copy();
    copy.percivalEnabled = percivalEnabled;
    return copy;
  }

  withQuestLogEnabled(questLogEnabled) {
    const copy = this.copy();
    copy.questLogEnabled = questLogEnabled;
    return copy;
  }
}

module.exports = Settings;