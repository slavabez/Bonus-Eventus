import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ColorCircle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const Color = props => {
  return (
    <ColorCircle
      color={props.color}
      onClick={() => {
        props.handleSelect(props.color);
      }}
    />
  );
};

Color.propTypes = {
  color: PropTypes.string,
  handleSelect: PropTypes.func
};

export default Color;
