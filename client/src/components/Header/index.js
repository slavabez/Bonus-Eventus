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
  grid-template-columns: 1fr repeat(1, auto) 1fr;
  grid-column-gap: 5px;

  li:nth-child(1) {
    grid-column-start: 2;
  }
  li:nth-child(2) {
    margin-left: auto;
  }

  img {
    max-height: 100px;
    justify-self: center;
  }
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <img src={logo} alt="BE Dice Logo (Bonus Eventus)" />
        <ProfileControls />
      </Wrapper>
    );
  }
}

export default Header;
