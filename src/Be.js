import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-awesome-modal";
import RoomSelection from "./components/RoomSelection";
import RegistrationModal from "./components/RegistrationModal";

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

const AppBody = styled.section`
  height: 85vh;
  background-image: linear-gradient(to right, #f8cff7, #d4fbfe);
`;


class Be extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistration: true
    };
  }

  openModal() {
    this.setState({ showRegistration: true });
  }

  closeModal() {
    this.setState({ showRegistration: false });
  }

  render() {
    return (
      <AppWrapper>
        <Header>
          <img src="images/logo.png" alt="Bonus Eventus Logo" />
        </Header>
        <AppBody>
          <RoomSelection />
          <Modal
            visible={this.state.showRegistration}
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <RegistrationModal />
          </Modal>
        </AppBody>
      </AppWrapper>
    );
  }
}

export default Be;
