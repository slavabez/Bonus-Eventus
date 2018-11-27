import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;

  > div {
    width: 100%;
    text-align: center;
  }
`;

export const MainView = styled.div`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    font-size: 1rem;

    li {
      padding: 0.5rem;
    }
  }
`;
