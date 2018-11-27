import React, { Component } from "react";
import { CenteredFlex, LargeText, TextContent } from "../shared";
import CharacterCreation from "./CharacterCreation";

class RegistrationPage extends Component {
  render() {
    return (
      <CenteredFlex>
        <TextContent>
          <LargeText>Choose how you will be seen</LargeText>
        </TextContent>
        <CharacterCreation />
      </CenteredFlex>
    );
  }
}

export default RegistrationPage;
