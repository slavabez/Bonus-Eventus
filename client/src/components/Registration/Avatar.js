import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  max-width: 2rem;
  border-radius: 50%;
  border: 4px solid ${props => ((props.selected) ? "black" : "transparent")};
  
  @media(min-width: 768px){
    max-width: 3rem;
  }
`;

const Avatar = props => {
  return (
    <Image
      src={props.src}
      onClick={() => {
        props.handleSelect(props.src);
      }}
      selected={props.selected}
    />
  );
};
Avatar.propTypes = {
  src: PropTypes.string,
  handleSelect: PropTypes.func,
  selected: PropTypes.bool
};

export default Avatar;
