class RollMessage {
  constructor(){
    this.author = "";
    this.rolls = [];
    this.timestamp = new Date();
  }
}

module.exports = RollMessage;
