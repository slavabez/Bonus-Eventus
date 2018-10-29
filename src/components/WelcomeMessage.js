import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 600px;
  text-align: center;
  font-size: 2rem;
  color: #05927b;

  a {
    width: fit-content;
    align-self: center;
    background-color: #00d0ae;
    font-family: "Dosis", sans-serif;
    padding: 2px 50px;
    border-radius: 2rem;
    color: white;
    font-size: 3rem;
    text-align: center;
    border: none;
    margin-bottom: 2rem;
    text-decoration: none;
  }
`;

const WelcomeMessage = () => {
  return (
    <WelcomeWrapper>
      <Content>
        <h1>Welcome to Bonus Eventus</h1>
        <p>
          Bonus Eventus is an online dice room. You can create room and a simple
          profile, invite your friends and roll various dice together.{" "}
        </p>
        <Link to="/profile/">Let's roll</Link>
      </Content>
    </WelcomeWrapper>
  );
};

export default WelcomeMessage;
