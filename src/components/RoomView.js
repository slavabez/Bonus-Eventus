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
  align-items: start;
  justify-content: center;
  overflow-y: auto;
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
  align-items: start;
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
//#endregion

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
    this.el.scrollIntoView({ behavior: "smooth" })
  };

  renderPlayers = () => {
    return fakePlayers.map(p => (
      <Player key={Math.random()}>
        <Avatar src={p.avatar} alt={p.name} color={p.color} />
        <Name color={p.color}>
          {p.name} {p.id ? "(You)" : ""}
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

  render() {
    if (!appStore.inRoom) return <Redirect to="/profile" />;
    return (
      <Wrapper>
        <LeftPane>
          <PlayerList>{this.renderPlayers()}</PlayerList>
        </LeftPane>
        <DicePane>
          <h1>Welcome to {appStore.inRoom}</h1>
          <button
            onClick={() => {
              this.roll("1d20");
            }}
          >
            Roll 1d20
          </button>
          <button
            onClick={() => {
              this.roll("5d6");
            }}
          >
            Roll 5d6
          </button>
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
