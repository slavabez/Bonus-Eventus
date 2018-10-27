import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

const JoinButton = styled.button``;

class RoomSelector extends Component {

  joinRoom = (name) => {
    appStore.joinRoom(name);
  };

  render() {
    return (
      <div>
        {appStore.rooms.map(room => (
          <JoinButton key={room.name} onClick={() => {
            this.joinRoom(room.name)
          }}>
            {room.name}
          </JoinButton>
        ))}
      </div>
    );
  }
}

export default view(RoomSelector);
