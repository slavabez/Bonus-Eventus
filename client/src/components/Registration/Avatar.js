import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  max-width: 2rem;
`;

const Avatar = props => {
  return (
    <Image
      src={props.src}
      onClick={() => {
        props.handleSelect(props.src);
      }}
    />
  );
};
Avatar.propTypes = {
  src: PropTypes.string,
  handleSelect: PropTypes.func
};

export default Avatar;
