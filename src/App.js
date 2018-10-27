import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RoomSelector from "./components/RoomSelector";
import RoomAdd from "./components/RoomAdd";
import RollInput from "./components/RollInput";
import Status from "./components/Status";
import Register from "./components/Register";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Status/>
        <Register/>
        <RoomAdd/>
        <RoomSelector/>
        <RollInput/>
      </div>
    );
  }
}

export default App;
