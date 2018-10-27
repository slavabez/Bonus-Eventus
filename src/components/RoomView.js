import React, { Component } from "react";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

class RoomView extends Component {
  render() {

    if (appStore.inRoom){
      return (
        <div>
          <hr />
          <h1>Currently in room {appStore.inRoom}</h1>

          <hr />
        </div>
      );
    } else {
      return <div>
        <hr/>
        <h1>Not in a room</h1>
        <hr/>
      </div>
    }

  }
}

export default view(RoomView);
