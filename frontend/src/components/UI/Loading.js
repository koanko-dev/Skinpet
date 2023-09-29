import React from 'react';

import styled, { keyframes } from 'styled-components';
import palette from '../../lib/styles/palette';

const Loading = () => {
  return (
      <LoadingBox>
        <div />
        <div />
        <div />
      </LoadingBox>
  );
};

// source : https://codepen.io/bassetts/pen/RqrPWG
const bounce = keyframes`
  to {
    opacity: 0.6;
    transform: translate3d(0, -1rem, 0);
  }
`;

const LoadingBox = styled.div`
  margin-top: 4rem;
  height: 4.8rem;
  div {
    float: left;
    width: 1rem;
    height: 1rem;
    margin: 2rem 0.3rem;
    background: ${palette.blue[2]};
    border-radius: 50%;
    animation: 0.6s ${bounce} infinite alternate;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

export default Loading;
