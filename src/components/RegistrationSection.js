import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import Loading from "./LoadingSpinner";
import appStore from "../stores/appStore";
import { Redirect } from "react-router-dom";

const avatars = [
  "/images/rogue_100.png",
  "/images/sorcerer_100.png",
  "/images/paladin_100.png",
  "/images/warlock_100.png",
  "/images/monk_100.png",
  "/images/cleric_100.png",
  "/images/bard_100.png"
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

//#region styled components
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 850px;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  h1 {
    text-align: center;
    font-size: 2rem;
    color: #003e34;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
const Avatar = styled.img`
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
  display: flex;
  align-items: center;
  min-height: 5rem;
`;
//#endregion

class RegistrationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAvatar: avatars[0],
      selectedColor: colors[0],
      name: "",
      isLoading: false
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
  handleProfileSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    appStore.register({
      name: this.state.name,
      avatar: this.state.selectedAvatar,
      color: this.state.selectedColor
    });
  };

  render() {
    // If we already have a profile, redirect ro rooms
    if (appStore.currentUser.name) return <Redirect to="/rooms/" />;
    const renderIcons = avatars.map(a => (
      <Avatar
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
        <Form onSubmit={this.handleProfileSubmit}>
          <h1>Choose how you will be seen in a room</h1>
          <AvatarContainer>{renderIcons}</AvatarContainer>
          <ColorContainer>{renderColors}</ColorContainer>
          <InputForm color={this.state.selectedColor}>
            <label htmlFor="register-name-select">Name</label>
            <input
              type="text"
              value={this.state.name}
              required
              minLength="3"
              maxLength="25"
              id="register-name-select"
              onChange={this.onNameInput}
            />
          </InputForm>
          <CreateButton type="submit" color={this.state.selectedColor}>
            Create profile
            {this.state.isLoading ? <Loading /> : null}
          </CreateButton>
        </Form>
      </Wrapper>
    );
  }
}

export default view(RegistrationSection);
