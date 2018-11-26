import React, { Component } from "react";
import styled from "styled-components";
import { avatars, profileColors } from "../shared";
import Avatar from "./Avatar";
import Color from "./Color";
import CharacterPreview from "./CharacterPreview";

const Wrapper = styled.form`
  width: 100%;
`;

const Avatars = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Colors = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

class CharacterCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAvatar: "/images/none_100.png",
      selectedName: "Player",
      selectedColor: profileColors[0]
    };
  }

  handleAvatarChange = avatar => {
    this.setState({ selectedAvatar: avatar });
  };

  handleColorChange = color => {
    this.setState({ selectedColor: color });
  };

  handleNameChange = e => {
    this.setState({ selectedName: e.target.value });
  };

  handleCharacterSubmit = e => {
    e.preventDefault();
  };

  renderAvatars() {
    return avatars.map(a => (
      <Avatar src={a} key={a} handleSelect={this.handleAvatarChange} />
    ));
  }

  renderColors() {
    return profileColors.map(c => (
      <Color color={c} key={c} handleSelect={this.handleColorChange} />
    ));
  }

  render() {
    const { selectedAvatar, selectedName, selectedColor } = this.state;
    return (
      <Wrapper oNSubmit={this.handleCharacterSubmit}>
        <CharacterPreview
          avatar={selectedAvatar}
          color={selectedColor}
          name={selectedName}
        />
        <Avatars>{this.renderAvatars()}</Avatars>
        <br />
        <Colors>{this.renderColors()}</Colors>
        <input
          type="text"
          onChange={this.handleNameChange}
          value={this.state.selectedName}
        />
      </Wrapper>
    );
  }
}

export default CharacterCreation;
