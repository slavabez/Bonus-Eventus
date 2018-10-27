import React, { Component } from "react";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

class Register extends Component {
  state = {};

  handleSubmit = (e) => {
    e.preventDefault();
    const fakeProps = {
      name: "Steve",
      avatar: "cool.png",
      color: "black"
    };

    appStore.register(fakeProps);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Register using defaults</button>
      </form>
    );
  }
}

export default view(Register);
