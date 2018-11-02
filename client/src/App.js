import React, { Component } from 'react';
import io from "socket.io-client";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    message: "",
    mounted: "",
    connected: "",
    received: ""
  };

  componentDidMount(){
    let mounted, connected, received = "";
    mounted = performance.now();
    // Setup socketio
    const socket = io.connect(null, {
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log(`Connected to server, id ${socket.id}`);
      connected = performance.now();

      socket.emit("server.ping", { message: "Are you there?" })

      // socket.emit("Ping", { message: "Are you here?" });
    });

    socket.on("server.pong", message => {
      received = performance.now();
      this.setState({
        message: message.message,
        mounted,
        connected,
        received
      });
    });


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.message}
          </p>
          <ul>
            <li>Mounted: {this.state.mounted}</li>
            <li>Connected: {this.state.connected}</li>
            <li>Received: {this.state.received}</li>
          </ul>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
