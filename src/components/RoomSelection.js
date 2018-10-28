import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";
import { Redirect } from "react-router-dom";

//#region styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  h1 {
    background-color: #47cead;
    padding: 2px 20px;
    border-radius: 2rem;
    color: white;
    font-size: 2rem;
    text-align: center;
    width: fit-content;
  }
`;

const JoinRoomWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateRoomWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomListWrapper = styled.div`
  background-color: white;
  border-radius: 2rem;
  width: 90%;
  height: 80%;
`;

const RoomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2.5rem;
  height: 88%;

  li {
    font-size: 1.8rem;
    color: #47cead;
    border-radius: 2rem;
    padding: 0.25rem 0.25rem 0.25rem 1rem;
  }

  li:hover {
    background-color: #e7e7e7;
  }
`;

const CreateRoomBackground = styled.div`
  background-color: white;
  border-radius: 2rem;
  width: 90%;
`;

const CreateRoomDialog = styled.form`
  font-family: "Dosis", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;

  button {
    background-color: #47cead;
    font-family: "Dosis", sans-serif;
    padding: 2px 50px;
    border-radius: 2rem;
    color: white;
    font-size: 2rem;
    text-align: center;
    border: none;
    margin-top: 2.5rem;
    align-self: stretch;
  }
`;

const FormRow = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;

  label {
    font-size: 1.8rem;
    color: #47cead;
  }

  input {
    font-family: "Dosis", sans-serif;
    width: 70%;
    border: none;
    background-color: #e7e7e7;
    border-radius: 2rem;
    text-align: center;
    font-size: 1.8rem;
    color: #47cead;
  }
`;
//#endregion
class RoomSelection extends Component {
  state = {
    newName: ""
  };
  handleRoomJoin = roomName => {
    appStore.joinRoom(roomName);
  };
  handleRoomCreate = e => {
    e.preventDefault();
    appStore.createNewRoom(this.state.newName);
  };

  renderRoomList = () => {
    return appStore.rooms.map(r => (
      <li
        key={r.name}
        onDoubleClick={() => {
          this.handleRoomJoin(r.name);
        }}
      >
        {r.name}
      </li>
    ));
  };
  render() {
    // If no profile - create profile
    if (!appStore.currentUser.name) return <Redirect to="/profile" />;
    // If already in a room - redirect to room view
    if (appStore.inRoom) return <Redirect to="/rooms/in/" />;
    return (
      <Container>
        <JoinRoomWrapper>
          <h1>Join a room</h1>
          <RoomListWrapper>
            <RoomList>{this.renderRoomList()}</RoomList>
          </RoomListWrapper>
        </JoinRoomWrapper>
        <CreateRoomWrapper>
          <h1>Create a Room</h1>
          <CreateRoomBackground>
            <CreateRoomDialog onSubmit={this.handleRoomCreate}>
              <FormRow>
                <label htmlFor="new-room-name">Name:</label>
                <input
                  type="text"
                  id="input-room-name"
                  value={this.state.newName}
                  onChange={e => {
                    this.setState({ newName: e.target.value });
                  }}
                  required
                  minLength="3"
                />
              </FormRow>
              <button>Create</button>
            </CreateRoomDialog>
          </CreateRoomBackground>
        </CreateRoomWrapper>
      </Container>
    );
  }
}

export default view(RoomSelection);
