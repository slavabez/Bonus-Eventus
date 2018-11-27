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
  margin-top: 1rem;
`;

const Colors = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
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
    border-bottom: 4px solid ${props => props.color || "grey"};
  }
`;

const Submit = styled.button`
  background-color: ${props => props.color || "grey"};
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  color: white;
  border: none;
  border-radius: 0.5rem;
  margin-top: 1rem;
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
        <Colors>{this.renderColors()}</Colors>
        <NameInput
          type="text"
          onChange={this.handleNameChange}
          value={this.state.selectedName}
          maxLength="12"
          minLength="3"
          required
          color={this.state.selectedColor}
        />
        <Submit type="submit" color={this.state.selectedColor}>
          Join a room
        </Submit>
      </Wrapper>
    );
  }
}

export default CharacterCreation;
