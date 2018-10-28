import React, { Component } from "react";
import styled from "styled-components";

const avatars = [
  "images/rogue_400.png",
  "images/sorcerer_400.png",
  "images/paladin_400.png",
  "images/warlock_400.png",
  "images/monk_400.png",
  "images/cleric_400.png",
  "images/bard_400.png"
];

const colors = [
  "#FF87C3",
  "#FF5364",
  "#FF6D4E",
  "#FFCE48",
  "#85D560",
  "#00CFAD",
  "#00C1EA",
  "#219CEE",
  "#B692EF",
  "#626262"
];

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-image: linear-gradient(to right, #f8cff7, #d4fbfe);

  h1 {
    text-align: center;
    font-size: 2rem;
    color: #003E34;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
const Icon = styled.img`
  max-width: 8rem;
  margin: 0.5rem;
  border: ${props =>
    props.isSelected
      ? `8px solid ${props.selectedColor}`
      : "8px solid transparent"};
  border-radius: 50%;
  cursor: pointer;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const ColorPicker = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: ${props => props.color};
  border-radius: 2rem;
  border: ${props =>
    props.isSelected ? "4px solid black" : "4px solid transparent"};
  cursor: pointer;
`;
const InputForm = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  width: fit-content;
  align-self: center;

  label {
    margin-right: 1rem;
    font-size: 1.8rem;
  }
  input {
    font-size: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    text-align: center;
    font-family: "Dosis", sans-serif;
  }
`;
const CreateButton = styled.button`
  width: fit-content;
  align-self: center;
  background-color: ${props => props.color};
  font-family: "Dosis", sans-serif;
  padding: 2px 50px;
  border-radius: 2rem;
  color: white;
  font-size: 2rem;
  text-align: center;
  border: none;
  margin-bottom: 2rem;
`;

class RegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAvatar: avatars[0],
      selectedColor: colors[0],
      name: ""
    };
  }

  onColorSelect = color => {
    this.setState({ selectedColor: color });
  };
  onAvatarSelect = avatar => {
    this.setState({ selectedAvatar: avatar });
  };
  onNameInput = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const renderIcons = avatars.map(a => (
      <Icon
        src={a}
        alt={a}
        key={a}
        selectedColor={this.state.selectedColor}
        isSelected={this.state.selectedAvatar === a}
        onClick={() => {
          this.onAvatarSelect(a);
        }}
      />
    ));
    const renderColors = colors.map(c => (
      <ColorPicker
        color={c}
        key={c}
        isSelected={this.state.selectedColor === c}
        onClick={() => {
          this.onColorSelect(c);
        }}
      />
    ));
    return (
      <Wrapper>
        <h1>Choose how you will be seen in a room</h1>
        <IconContainer>{renderIcons}</IconContainer>
        <ColorContainer>{renderColors}</ColorContainer>
        <InputForm color={this.state.selectedColor}>
          <label htmlFor="register-name-select">Name</label>
          <input
            type="text"
            value={this.state.name}
            required
            minLength="3"
            id="register-name-select"
            onChange={this.onNameInput}
          />
        </InputForm>
        <CreateButton type="submit" color={this.state.selectedColor}>
          Create profile
        </CreateButton>
      </Wrapper>
    );
  }
}

export default RegistrationModal;
