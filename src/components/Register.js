import React, { Component } from "react";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

class Register extends Component {
  state = {};



  render() {
    return (
      <form>
        <button type="submit">Register using defaults</button>
      </form>
    );
  }
}

export default view(Register);
