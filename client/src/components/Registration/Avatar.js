import React from 'react';
import PropTypes from "prop-types";

const Avatar = (props) => {
  return (
    <img src={props.src}  />
  );
};
Avatar.propTypes = {
  src: PropTypes.string
};

export default Avatar;
