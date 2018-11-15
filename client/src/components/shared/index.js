import styled from "styled-components";
import { Link } from "react-router-dom";

export const CenteredFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.div`
  max-width: 900px;
  text-align: center;
  padding: 0 1rem;
`;

export const LargeTitle = styled.h1`
  font-size: 3rem;
`;

export const LargeText = styled.p`
  font-size: 2rem;
`;

export const LargeButtonLink = styled(Link)`
  width: fit-content;
  align-self: center;
  background-color: rgb(0, 208, 174);
  font-family: Dosis, sans-serif;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  padding: 2px 50px;
  border-radius: 2rem;
  border-image: initial;
  text-decoration: none;

  color: white;
`;
