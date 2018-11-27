import React, { Component } from "react";
import styled from "styled-components";
import { avatars, profileColors, beGreen } from "../shared";
import Avatar from "./Avatar";
import Color from "./Color";
import CharacterPreview from "./CharacterPreview";
import characterStore from "../../stores/character";

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

const NameInput = styled.input`
  margin-top: 1rem;
  width: 80%;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid ${props => props.color || "grey"};
  text-align: center;
  font-size: 1.5rem;

  :focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem ${props => props.color || "grey"};
  }
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
    characterStore.register({
      avatar: this.state.selectedAvatar,
      name: this.state.selectedName,
      color: this.state.selectedColor
    });
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
      <Wrapper onSubmit={this.handleCharacterSubmit}>
        <CharacterPreview
          avatar={selectedAvatar}
          color={selectedColor}
          name={selectedName}
        />
        <Avatars>{this.renderAvatars()}</Avatars>
        <br />
        <Colors>{this.renderColors()}</Colors>
        <NameInput
          type="text"
          onChange={this.handleNameChange}
          value={this.state.selectedName}
          maxLength="12"
          minLength="3"
          color={this.state.selectedColor}
        />
      </Wrapper>
    );
  }
}

export default CharacterCreation;
