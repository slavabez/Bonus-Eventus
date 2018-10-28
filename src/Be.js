import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { view } from "react-easy-state";
import styled from "styled-components";
import RoomSelection from "./components/RoomSelection";
import RegistrationSection from "./components/RegistrationSection";

import "./main.css";

import appStore from "./stores/appStore";
import WelcomeMessage from "./components/WelcomeMessage";
import RoomView from "./components/RoomView";

//#region styled components
const AppWrapper = styled.div`
  font-family: "Dosis", sans-serif;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
  }
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aquamarine;

  a {
    padding: 0.25rem 1rem;
    font-size: 1.5rem;
    text-decoration: none;
  }
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
          <img src="/images/logo.png" alt="Bonus Eventus Logo" />
        </Header>
        <Router>
          <div>
            <Nav>
              <Link to="/">Intro</Link>
              <Link to="/profile/">Profile</Link>
              <Link to="/rooms/">Rooms</Link>
              <Link to="/rooms/in/">Sample Room</Link>
            </Nav>
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
