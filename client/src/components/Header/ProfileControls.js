import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  button {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid green;
    border-radius: 50%;
    cursor: pointer;
  }
`;

class ProfileControls extends Component {
  render() {
    return (
      <Wrapper>
        <button>Exit room</button>
        <button>Profile</button>
      </Wrapper>
    );
  }
}

export default ProfileControls;
