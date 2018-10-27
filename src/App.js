import React, { Component } from 'react';
import Register from "./components/Register";
import socket from "./socket";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      server: socket()
    };
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
