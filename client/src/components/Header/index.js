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
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-height: 100px;
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
