import React, { Component } from "react";
import axios from "axios";
import Register from "./components/Register";
import socket from "./socket";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: socket()
    };
  }

  async componentDidMount() {
    const response = await axios.post("/users", {
      name: "lol",
      avatar: "avatar.lol",
      id: "i7h0o6zjnr1vd1u",
      color: "blaaaaaaaaaaack"
    });
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Register />
      </div>
    );
  }
}

export default App;
