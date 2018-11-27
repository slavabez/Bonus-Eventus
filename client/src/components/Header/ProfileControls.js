import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import characterStore from "../../stores/character";
import Door from "../shared/DoorSvg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    margin: 0.2rem;
    padding: 0.2rem;
    cursor: pointer;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
`;

const SmallAvatar = styled.img`
  border-radius: 50%;
  border: 4px solid ${props => props.color};
`;

class ProfileControls extends Component {
  render() {
    if (!characterStore.currentUser.id) return null;
    const { avatar, color } = characterStore.currentUser;

    return (
      <Wrapper>
        <Door />
        <SmallAvatar src={avatar} color={color} />
      </Wrapper>
    );
  }
}

export default view(ProfileControls);
