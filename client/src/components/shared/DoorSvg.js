import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  stroke-width: 0.2rem;
  stroke: white;
  padding: 0.5rem;
`;

const Door = () => (
  <Wrapper>
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 55 55"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path d="m53.924 24.382c0.101-0.244 0.101-0.519 0-0.764-0.051-0.123-0.125-0.234-0.217-0.327l-11.999-11.998c-0.391-0.391-1.023-0.391-1.414 0s-0.391 1.023 0 1.414l10.293 10.293h-21.586c-0.553 0-1 0.447-1 1s0.447 1 1 1h21.586l-10.293 10.293c-0.391 0.391-0.391 1.023 0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l11.999-11.999c0.092-0.092 0.166-0.203 0.217-0.326z" />
        <path d="m36.001 29c-0.553 0-1 0.447-1 1v16h-10v-38c0-0.436-0.282-0.821-0.697-0.953l-15.862-5.047h26.559v16c0 0.553 0.447 1 1 1s1-0.447 1-1v-17c0-0.553-0.447-1-1-1h-34c-0.032 0-0.06 0.015-0.091 0.018-0.056 5e-3 -0.105 0.018-0.158 0.032-0.094 0.025-0.178 0.059-0.259 0.108-0.026 0.016-0.057 0.016-0.082 0.034-0.031 0.023-0.055 0.052-0.083 0.077-0.017 0.016-0.035 0.03-0.051 0.047-0.076 0.082-0.138 0.173-0.184 0.273-9e-3 0.02-0.014 0.04-0.022 0.06-0.042 0.112-0.07 0.229-0.07 0.351v46c0 0.125 0.029 0.243 0.072 0.355 0.014 0.037 0.035 0.068 0.053 0.103 0.037 0.071 0.079 0.136 0.132 0.196 0.029 0.032 0.058 0.061 0.09 0.09 0.058 0.051 0.123 0.093 0.193 0.13 0.037 0.02 0.071 0.041 0.111 0.056 0.017 6e-3 0.03 0.018 0.047 0.024l22 7c0.098 0.03 0.2 0.046 0.302 0.046 0.21 0 0.417-0.066 0.59-0.192 0.258-0.188 0.41-0.488 0.41-0.808v-6h11c0.553 0 1-0.447 1-1v-17c0-0.553-0.448-1-1-1zm-13 23.633-20-6.364v-43.902l20 6.364v43.902z" />
      </g>
    </svg>
  </Wrapper>
);

export default Door;