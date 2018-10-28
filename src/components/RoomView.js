import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  padding: 1.5rem;
  height: 90%;
  grid-template-areas:
    "lp dp dp dp dp dp dp rp"
    "lp hp hp hp hp hp hp rp"
    "lp hp hp hp hp hp hp rp"
    "lp hp hp hp hp hp hp rp";
`;
const LeftPane = styled.div`
  grid-area: lp;
  background-color: white;
  border-radius: 1rem;
`;
const DicePane = styled.div`
  grid-area: dp;
  background-color: white;
  border-radius: 1rem;
`;
const History = styled.div`
  grid-area: hp;
`;
const RightPane = styled.div`
  grid-area: rp;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
`;
const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;
const Avatar = styled.img`

`;
const Name = styled.span``;

const fakePlayers = [
  {
    name: "Steven",
    avatar: "/images/monk_100.png",
    color: "#FF6D4E",
    id: "someid"
  },
  {
    name: "Alyona",
    avatar: "/images/cleric_100.png",
    color: "#FFCE48"
  },
  {
    name: "Rich",
    avatar: "/images/warlock_100.png",
    color: "#219CEE"
  },
  {
    name: "Steven",
    avatar: "/images/monk_100.png",
    color: "#626262"
  }
];

class RoomView extends Component {
  renderPlayers = () => {
    return fakePlayers.map(p => (
      <Player>
        <Avatar src={p.avatar} alt={p.name} color={p.color} />
        <Name color={p.color}>{p.name}</Name>
      </Player>
    ));
  };

  render() {
    return (
      <Wrapper>
        <LeftPane>
          <PlayerList>{this.renderPlayers()}</PlayerList>
        </LeftPane>
        <DicePane>Dice Pane</DicePane>
        <History>Roll History</History>
        <RightPane>Right Pane</RightPane>
      </Wrapper>
    );
  }
}

export default view(RoomView);
