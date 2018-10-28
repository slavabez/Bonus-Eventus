import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { view } from "react-easy-state";
import styled from "styled-components";
import RoomSelection from "./components/RoomSelection";
import RegistrationSection from "./components/RegistrationSection";

import WelcomeMessage from "./components/WelcomeMessage";
import RoomView from "./components/RoomView";
import LoginStatus from "./components/LoginStatus";

import "./main.css";

//#region styled components
const AppWrapper = styled.div`
  font-family: "Dosis", sans-serif;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Logo = styled.img`
  height: 100%;
`;
const AppBody = styled.section`
  align-items: center;
  justify-content: center;
  height: 85vh;
  background-image: linear-gradient(to right, #f8cff7, #d4fbfe);
`;
//#endregion

class Be extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistration: false
    };
  }

  render() {
    return (
      <AppWrapper>
        <Header>
          <Logo src="/images/logo.png" alt="Bonus Eventus Logo" />
          <LoginStatus />
        </Header>
        <Router>
          <div>
            <AppBody>
              <Route path="/" exact component={WelcomeMessage} />
              <Route path="/profile/" component={RegistrationSection} />
              <Route path="/rooms/" exact component={RoomSelection} />
              <Route path="/rooms/in/" component={RoomView} />
            </AppBody>
          </div>
        </Router>
      </AppWrapper>
    );
  }
}

export default view(Be);
