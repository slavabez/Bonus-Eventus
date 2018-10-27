import React, { Component } from "react";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;

  button {
    background-color: #47cead;
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
    width: 70%;
    border: none;
    background-color: #e7e7e7;
    border-radius: 2rem;
    text-align: center;
    font-size: 1.8rem;
    color: #47cead;
  }
`;

class RoomSelection extends Component {
  render() {
    return (
      <Container>
        <JoinRoomWrapper>
          <h1>Join a room</h1>
          <RoomListWrapper>
            <RoomList>
              <li>asd</li>
              <li>asd</li>
              <li>asd</li>
              <li>asd</li>
              <li>asd</li>
            </RoomList>
          </RoomListWrapper>
        </JoinRoomWrapper>
        <CreateRoomWrapper>
          <h1>Create a Room</h1>
          <CreateRoomBackground>
            <CreateRoomDialog>
              <FormRow>
                <label htmlFor="new-room-name">Name:</label>
                <input type="text" id="input-room-name" />
              </FormRow>
              <button>Create</button>
            </CreateRoomDialog>
          </CreateRoomBackground>
        </CreateRoomWrapper>
      </Container>
    );
  }
}

export default RoomSelection;
