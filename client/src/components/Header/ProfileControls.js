import React, {Component} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  
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
