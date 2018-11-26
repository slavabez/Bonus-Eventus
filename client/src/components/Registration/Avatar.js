import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  max-width: 4rem;
  margin: 0 1rem;
`;

const Avatar = (props) => {
  return (
    <Image src={props.src}  />
  );
};
Avatar.propTypes = {
  src: PropTypes.string
};

export default Avatar;
