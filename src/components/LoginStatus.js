import React from "react";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";
import styled from "styled-components";

const LoginStatusWrapper = styled.div`
  position: absolute;
  height: 80%;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  height: 60%;
  border-radius: 50%;
  border: 6px solid ${props => props.color};
`;
const LogoutButton = styled.button`
  font-family: "Dosis", sans-serif;
  margin-top: 0.5rem;
  border: none;
  background-color: ${props => props.color};
  color: white;
  font-size: 1.2rem;
  border-radius: 0.5rem;
`;

const LoginStatus = () => {
  if (!appStore.currentUser.name) return null;
  const { name, color, avatar } = appStore.currentUser;
  return (
    <LoginStatusWrapper>
      <Avatar color={color} src={avatar} alt={name} title={name} />
      <LogoutButton color={color} onClick={() => {
        appStore.logout();
      }}>Change</LogoutButton>
    </LoginStatusWrapper>
  );
};

export default view(LoginStatus);
