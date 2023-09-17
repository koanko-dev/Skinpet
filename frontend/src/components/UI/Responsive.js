import React from "react";
import styled from "styled-components";
import device from "../../lib/styles/device";

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

const ResponsiveBlock = styled.div`
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding-right: 2rem;
  padding-left: 2rem;

  @media ${device.laptop} {
    width: 768px;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

export default Responsive;
