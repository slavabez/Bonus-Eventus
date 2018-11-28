import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ColorCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => (props.selected ? "black" : "transparent")};

  @media (min-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const Color = props => {
  return (
    <ColorCircle
      color={props.color}
      onClick={() => {
        props.handleSelect(props.color);
      }}
      selected={props.selected}
    />
  );
};

Color.propTypes = {
  color: PropTypes.string,
  handleSelect: PropTypes.func
};

export default Color;
