import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Responsive from "../UI/Responsive";

const NavBar = () => {
  return (
    <Header>
      <Wrapper>
        <NavBox>

          <HomeLinkBox>
            <Link to="/">HOME</Link>
          </HomeLinkBox>

          <NavListBox>
            <NavLi>
              <NavLink
                to="/prediction"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Prediction
              </NavLink>
            </NavLi>
          </NavListBox>
          
        </NavBox>
      </Wrapper>
    </Header>
  );
};

export default NavBar;

const Header = styled.header`
  border-radius: 20px;
  width: 100%;
  height: 7rem;
  position: fixed;
  top: 0;
  z-index: 10;
  outline: 1px solid red;
`;

const Wrapper = styled(Responsive)``;

const NavBox = styled.nav`
  font-weight: 400;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

const HomeLinkBox = styled.div`
  height: 40px;
  margin-top: 38px;
`;

const NavListBox = styled.ul`
  height: 40px;
  position: absolute;
  top: 30px;
  left: 50%;
  background-color: #fff;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0 32px;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const NavLi = styled.li`
  padding: 0px 20px;

  a {
    height: 100%;

    &:hover,
    &:active,
    &.active {
      color: salmon;
    }
  }
`;
