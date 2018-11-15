import React, { Component } from "react";
import styled from "styled-components";
import { avatars, profileColors } from "../shared";
import Avatar from "./Avatar";
import Color from "./Color";

const Wrapper = styled.div``;
const Avatars = styled.div``;
const Colors = styled.div``;

class CharacterCreation extends Component {
  renderAvatars() {
    return avatars.map(a => <Avatar src={a} key={a} />);
  }

  renderColors() {
    return avatars.map(c => <Color color={c} key={c} />);
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
