import React, { Component } from "react";
import { view } from "react-easy-state";
import appState from "../stores/appStore";

class RollInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoll: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    appState.sendMessage(this.state.newRoll);
    this.setState({ newRoll: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="roll-input">Send a roll:</label>
        <input
          id="roll-input"
          type="text"
          required
          minLength="3"
          value={this.state.newRoll}
          onChange={e => {
            this.setState({ newRoll: e.target.value });
          }}
        />
        <button
          type="button"
          onClick={() => {
            appState.sendMessage("1d20");
          }}
        >
          1d20
        </button>
      </form>
    );
  }
}

export default view(RollInput);
