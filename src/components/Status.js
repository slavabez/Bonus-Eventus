import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import appStore from "../stores/appStore";

const StatusBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0;
`;

class Status extends Component {
  leaveGroup = () => {
    if (appStore.inRoom) {
      appStore.leaveRoom(appStore.inRoom);
    }
  };

  render() {
    return (
      <StatusBar>
        <span>Registered as: {appStore.currentUser.name}</span>
        <span>Avatar: {appStore.currentUser.avatar}</span>
        <span>Color: {appStore.currentUser.color}</span>
        <span>In a room: {appStore.inRoom}</span>
        <button onClick={this.leaveGroup}>Leave Room</button>
      </StatusBar>
    );
  }
}

export default view(Status);
