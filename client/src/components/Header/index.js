import React, { Component } from "react";
import styled from "styled-components";
import ProfileControls from "./ProfileControls";

import { beDarkGreen } from "../shared";

import logo from "../../assets/logo_white_small.png";

const Wrapper = styled.header`
  width: 100%;
  background-color: ${beDarkGreen};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  img {
    height: 50px;
    width: auto;
  }
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Inner>
          <img src={logo} alt="BE Dice Logo (Bonus Eventus)" />
          <ProfileControls />
        </Inner>
      </Wrapper>
    );
  }
}

export default Header;
