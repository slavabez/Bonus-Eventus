import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { beGreen } from "../shared";

const Wrapper = styled.div`
  grid-area: p;
  border: 4px solid ${props => props.color || "transparent"};
  margin: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  border: 8px solid ${props => props.color};
`;

const Title = styled.span`
  width: 100%;
  font-size: 1.5rem;
  color: ${props => props.color || "black"};
  
  @media(min-width: 768px){
    font-size: 2rem;
  }
`;

const CharacterPreview = props => {
  return (
    <Wrapper color={props.color}>
      <AvatarImage src={props.avatar} color={props.color} />
      <Title color={props.color}>{props.name}</Title>
    </Wrapper>
  );
};

CharacterPreview.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  avatar: PropTypes.string
};

export default CharacterPreview;
