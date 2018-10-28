class RollMessage {
  constructor(props){
    const { authorName, authorAvatar, authorColor, total, rolls, rollString } = props;
    this.author = {
      name: authorName,
      avatar: authorAvatar,
      color: authorColor
    };
    this.rollString = rollString;
    this.total = total;
    this.rolls = rolls;
    this.createdAt = new Date();
  }
}

module.exports = RollMessage;
