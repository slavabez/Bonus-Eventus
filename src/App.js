import React, { Component } from "react";
import axios from "axios";
import Register from "./components/Register";
import socket from "./socket";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = socket();
    this.socket.on("room.created", data => {
      console.log("room.created called");
      this.onRoomCreated(data);
      this.setState({ message: `Room "${data.name}" created` });
    });
    this.socket.on("room.allRooms", data => {
      console.log("room.allRooms called", data);
      this.setState({ rooms: data, message: `There are ${data.length} rooms` });
    });

    this.state = {
      rooms: [],
      input: "",
      message: ""
    };
  }

  createRoom = () => {
    this.socket.emit("room.create", { name: this.state.input })
  };

  onRoomCreated = (data) => {
    console.log(data);
  };

  componentDidMount(){
    this.socket.emit("room.listAll", (all) => {
      this.setState({ rooms: all });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Register />
        <input type="text" onChange={(e) => { this.setState({ input: e.target.value }) }} value={this.state.input}/>
        <button onClick={this.createRoom}>Create a room</button>
        {(this.state.message) ? <p>{this.state.message}</p> : null}

        {this.state.rooms.map(room => <p key={room.name}>{room.name}</p>)}

      </div>
    );
  }
}

export default App;
