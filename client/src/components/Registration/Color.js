import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const ColorCircle = styled.div`
  background-color: ${props => props.color};
`;

const Color = props => {
  return <ColorCircle color={props.color} />
};

Color.propTypes = {
  color: PropTypes.string
};

export default Color;
