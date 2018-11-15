import React, { Component } from "react";

class RoomView extends Component {
  render() {
    return <div>You're in the "{this.props.match.params.roomName}" room!</div>;
  }
}

export default RoomView;
