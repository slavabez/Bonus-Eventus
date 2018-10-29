import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

//#region styled components
const Wrapper = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  height: 80vh;
  grid-template-areas:
    "lp dp"
    "lp hp";
  grid-template-rows: 200px;
  grid-template-columns: 200px;
  width: 96%;
  padding: 2%;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;
const History = styled.div`
  grid-area: hp;
  overflow-y: auto;
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
  align-items: center;
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

const DiceDashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
  transition: 2s width;
  position: relative;
  width: 100%;
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
  max-height: 145px;
`;
const DiceName = styled.span`
  color: white;
  background-color: #47cead;
  margin-top: 0.5rem;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
`;
const CustomButtonWrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 1rem;

  span {
    font-size: 1.1rem;
    padding-top: 1rem;
  }

  @media (max-width: 1024px) {
    p {
      display: none;
    }
  }

  button {
    color: white;
    background-color: #47cead;
    margin-top: 0.5rem;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    font-family: "Dosis", sans-serif;
    border: none;
    cursor: pointer;
  }
`;
const CustomInput = styled.input`
  color: #47cead;
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-family: "Dosis", sans-serif;
  border: 1px solid #47cead;
  font-size: 1.5rem;
  text-align: center;
  max-width: 100px;
`;

const CustomButtonToggle = styled.button`
  transform: rotate(270deg);
  transform-origin: center;
  color: white;
  background-color: #47cead;
  margin-top: 0.5rem;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  right: -6%;
  border: none;
  cursor: pointer;
  font-family: "Dosis", sans-serif;
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
    this.state = {
      input: "2d10",
      showCustom: false
    };
  }

  toggleShowCustom = () => {
    this.setState(os => ({ showCustom: !os.showCustom }));
  };

  componentDidMount = () => {
    this.scrollToBottom();
  };

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  handleCustomRollSubmit = e => {
    e.preventDefault();
    // Verify it's within range
    const parts = this.state.input.split("d");
    if (parts[0] > 0 && parts[0] <= 100 && parts[1] >= 2 && parts[1] <= 100) {
      this.roll(this.state.input);
    }
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
      <DiceItem
        onClick={() => {
          appStore.sendRoll("1" + d.name);
        }}
        key={d.name}
      >
        <DiceImage src={d.image} alt={d.name} title={`Roll a ${d.name}`} />
        <DiceName>{d.name}</DiceName>
      </DiceItem>
    ));
  };

  render() {
    if (!appStore.inRoom) return <Redirect to="/profile" />;
    // If inRoom but server says there are no players in the room - the room has probably been deleted, redirect to room selection and query for rooms again
    return (
      <Wrapper>
        <LeftPane>
          <h1>{appStore.inRoom}</h1>
          <PlayerList>{this.renderPlayers()}</PlayerList>
        </LeftPane>
        <DicePane>
          <DiceDashboard>
            {this.renderDiceButtons()}
            {this.state.showCustom ? (
              <CustomButtonWrapper onSubmit={this.handleCustomRollSubmit}>
                <CustomInput
                  type="text"
                  pattern="[1-9]{1,3}d[0-9]{1,3}"
                  value={this.state.input}
                  onChange={e => {
                    this.setState({ input: e.target.value });
                  }}
                />
                <span>1d2 to 100d100</span>
                <button type="submit">Custom roll</button>
              </CustomButtonWrapper>
            ) : null}
          </DiceDashboard>
          <CustomButtonToggle
            onClick={() => {
              this.toggleShowCustom();
            }}
          >
            Toggle Custom
          </CustomButtonToggle>
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
      </Wrapper>
    );
  }
}

export default view(RoomView);
