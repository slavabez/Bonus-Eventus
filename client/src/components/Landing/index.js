import React, { Component } from "react";
import {
  CenteredFlex,
  LargeTitle,
  LargeText,
  TextContent,
  LargeButtonLink
} from "../shared";

class LandingPage extends Component {
  render() {
    return (
      <CenteredFlex>
        <TextContent>
          <LargeTitle>I'm the Landing Page</LargeTitle>
          <LargeText>
            Bonus Eventus (BE-dice) is an online dice room. You can create room
            and a simple profile, invite your friends and roll various dice
            together..
          </LargeText>
          <LargeButtonLink to="/profile">Let's roll!</LargeButtonLink>
        </TextContent>
      </CenteredFlex>
    );
  }
}

export default LandingPage;
