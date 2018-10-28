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
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  height: 60%;
  border-radius: 50%;
  border: 6px solid ${props => props.color};
  cursor: pointer;
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
const ExitRoomButton = styled.button`
  font-family: "Dosis", sans-serif;
  font-size: 1.5rem;
  border: none;
  background-color: #FF6E50;
  padding: 0.5rem 2rem;
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
  margin-right: 1rem;
`;

const LoginStatus = () => {
  if (!appStore.currentUser.name) return null;
  const { name, color, avatar } = appStore.currentUser;
  return (
    <LoginStatusWrapper>
      {appStore.inRoom ? (
        <ExitRoomButton
          onClick={() => {
            appStore.leaveRoom(appStore.inRoom);
          }}
        >
          Exit Room
        </ExitRoomButton>
      ) : null}
      <Avatar
        color={color}
        src={avatar}
        alt={name}
        title={`Logout (${name})`}
        onClick={() => {
          appStore.logout();
        }}
      />
    </LoginStatusWrapper>
  );
};

export default view(LoginStatus);
