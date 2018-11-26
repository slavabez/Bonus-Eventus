import React, { Component } from "react";
import styled from "styled-components";
import ProfileControls from "./ProfileControls";

import logo from "../../assets/logo.png";

const Spacer = styled.div`
  width: 250px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Wrapper = styled.header`
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 5px;
  align-items: center;

  img {
    max-height: 75px;
    justify-self: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 2fr;

    img {
      max-height: 100px;
      justify-self: center;
    }
  }
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Spacer />
        <img src={logo} alt="BE Dice Logo (Bonus Eventus)" />
        <ProfileControls />
      </Wrapper>
    );
  }
}

export default Header;
