import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

//#region styled components
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: auto;

  h1 {
    background-color: #00d0ae;
    font-family: "Dosis", sans-serif;
    padding: 2px 2rem;
    border-radius: 1rem;
    color: white;
  }
`;
const DicePane = styled.div`
  grid-area: dp;
  background-color: white;
  border-radius: 1rem;
`;
const History = styled.div`
  grid-area: hp;
  overflow-y: auto;
`;
const RightPane = styled.div`
  grid-area: rp;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
`;
const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
`;
const Avatar = styled.img`
  max-width: 80px;
  border-radius: 50%;
  border: 6px solid ${props => props.color};
`;
const Name = styled.span`
  font-size: 1.3rem;
  color: ${props => props.color};
`;

const HistoryWrapper = styled.div`
  height: calc(100% - 1rem);
  padding-top: 1rem;
`;
const RollMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.2rem;
`;
const MessageAvatar = styled.img`
  max-width: 50px;
  border-radius: 50%;
  border: 6px solid ${props => props.color};
`;
const MessageBody = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  margin-left: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${props => props.color}
  font-size: 1.1rem;
`;
const RollAsString = styled.span`
  margin-right: 1rem;
`;
const RollBreakdown = styled.span`
  margin-right: 0.5rem;
`;
const RollTotal = styled.span`
  color: #47cead;
  text-decoration: underline;
`;

const CustomRollWrapper = styled.div`
  background-color: white;
  border-radius: 0.5rem;
`;

const DiceDashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
`;
const DiceItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;

  :hover {
    background-color: #e7f8ff;
  }
`;
const DiceImage = styled.img`
  max-width: 7vw;
`;
const DiceName = styled.span`
  color: white;
  background-color: #47cead;
  margin-top: 0.5rem;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
`;
//#endregion

const dice = [
  {
    image: "/images/d4.png",
    name: "d4"
  },
  {
    image: "/images/d6.png",
    name: "d6"
  },
  {
    image: "/images/d8.png",
    name: "d8"
  },
  {
    image: "/images/d10.png",
    name: "d10"
  },
  {
    image: "/images/d12.png",
    name: "d12"
  },
  {
    image: "/images/d20.png",
    name: "d20"
  }
];

class RoomView extends Component {
  constructor(props) {
    super(props);
    // Double check we're in a room
  }

  componentDidMount = () => {
    this.scrollToBottom();
  };

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  roll = string => {
    appStore.sendRoll(string);
  };

  scrollToBottom = () => {
    if (this.el) this.el.scrollIntoView({ behavior: "smooth" });
  };

  renderPlayers = () => {
    return appStore.roommates.map(p => (
      <Player key={Math.random()}>
        <Avatar src={p.avatar} alt={p.name} color={p.color} />
        <Name color={p.color}>
          {p.name} {p.id === appStore.currentUser.id ? "(You)" : ""}
        </Name>
      </Player>
    ));
  };

  renderRollHistory = () => {
    return appStore.rollHistory.map(m => {
      // Construct the message object
      const avatar = (
        <MessageAvatar
          src={m.author.avatar}
          alt={m.author.name}
          title={m.author.name}
          color={m.author.color}
        />
      );
      // If only one roll - don't show roll breakdown
      // use a reducer to get the values
      const breakdown =
        m.rolls.length !== 1
          ? m.rolls.map(r => r.result).join(" + ") + " = "
          : null;

      const body = (
        <MessageBody
          color={m.author.color}
          title={new Date(m.createdAt).toTimeString()}
        >
          <RollAsString>{m.rollString}: </RollAsString>
          {breakdown ? <RollBreakdown>{breakdown}</RollBreakdown> : null}
          <RollTotal>{m.total}</RollTotal>
        </MessageBody>
      );

      return (
        <RollMessage key={Math.random()}>
          {avatar}
          {body}
        </RollMessage>
      );
    });
  };

  renderDiceButtons = () => {
    return dice.map(d => (
      <DiceItem onClick={() => {
        appStore.sendRoll("1" + d.name);
      }}>
        <DiceImage src={d.image} alt={d.name} title={`Roll a ${d.name}`} />
        <DiceName>{d.name}</DiceName>
      </DiceItem>
    ));
  };

  render() {
    if (!appStore.inRoom) return <Redirect to="/profile" />;
    return (
      <Wrapper>
        <LeftPane>
          <h1>{appStore.inRoom}</h1>
          <PlayerList>{this.renderPlayers()}</PlayerList>
        </LeftPane>
        <DicePane>
          <DiceDashboard>{this.renderDiceButtons()}</DiceDashboard>
        </DicePane>
        <History>
          <HistoryWrapper>
            {this.renderRollHistory()}
            <div
              ref={el => {
                this.el = el;
              }}
            />
          </HistoryWrapper>
        </History>
        <RightPane>
          <CustomRollWrapper>Custom rolls</CustomRollWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

export default view(RoomView);
