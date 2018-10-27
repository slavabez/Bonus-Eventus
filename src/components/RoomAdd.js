import React, { Component } from "react";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

class RoomAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: ""
    };
  }

  createNewRoom = e => {
    e.preventDefault();
    appStore.createNewRoom(this.state.newName);
    this.setState({
      newName: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.createNewRoom}>
        <label htmlFor="new-room-name">New room name</label>
        <input
          required
          minLength="3"
          id="new-room-name"
          type="text"
          value={this.state.newName}
          onChange={e => {
            this.setState({ newName: e.target.value });
          }}
        />
      </form>
    );
  }
}

export default view(RoomAdd);
