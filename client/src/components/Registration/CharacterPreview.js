import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { beGreen } from "../shared";

const Wrapper = styled.div`
  border-color: ${beGreen};
  padding: 1rem 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  border: 8px solid ${props => props.color};
`;

const Title = styled.span`
  font-size: 1.5rem;
  color: ${props => props.color || "black"};
`;

const CharacterPreview = props => {
  return (
    <Wrapper>
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
