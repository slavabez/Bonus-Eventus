class RollMessage {
  constructor(props){
    const { authorName, authorAvatar, authorColor, total, rolls } = props;
    this.author = {
      name: authorName,
      avatar: authorAvatar,
      color: authorColor
    };
    this.total = total;
    this.rolls = rolls;
    this.createdAt = new Date();
  }
}

module.exports = RollMessage;
