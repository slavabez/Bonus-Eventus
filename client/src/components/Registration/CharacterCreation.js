import React, { Component } from "react";
import styled from "styled-components";
import { avatars, profileColors } from "../shared";
import Avatar from "./Avatar";
import Color from "./Color";

const Wrapper = styled.div``;
const Avatars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Colors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

class CharacterCreation extends Component {
  renderAvatars() {
    return avatars.map(a => <Avatar src={a} key={a} />);
  }

  renderColors() {
    return profileColors.map(c => <Color color={c} key={c} />);
  }

  render() {
    return (
      <Wrapper>
        <Avatars>{this.renderAvatars()}</Avatars>

        <Colors>{this.renderColors()}</Colors>
      </Wrapper>
    );
  }
}

export default CharacterCreation;
