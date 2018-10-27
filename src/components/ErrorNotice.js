import React from 'react';
import styled from "styled-components";
import {view} from "react-easy-state";
import appStore from "../stores/appStore";

const ErrorBar = styled.div`
  width: 100%;
  background-color: hotpink;
  text-align: center;
`;

const ErrorNotice = () => {
  return (
    <ErrorBar>
      {appStore.error || null}
    </ErrorBar>
  );
};

export default view(ErrorNotice);
