import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import { ReactComponent as FootPrintSvg } from "../../resources/img/green-footprint.svg";

const NavBar = () => {
  return (
    <Header>
      <Wrapper>
        <NavBox>
          <HomeLinkBox>
            <Link to="/">Skinpet<FootPrintSvg width='15' height='20' fill={palette.gray[8]}/></Link>
          </HomeLinkBox>

          <NavListBox>
            <NavLi>
              <NavLink
                to="/prediction"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                피부질환 분석
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
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Wrapper = styled(Responsive)``;

const NavBox = styled.nav`
  height: 100%;
  font-weight: 400;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

const HomeLinkBox = styled.div`
  a {
    font-weight: 800;
    text-decoration: none;
    color: ${palette.gray[8]};
  }

  svg {
    margin-left: 4px;
  }
`;

const NavListBox = styled.ul`
  list-style-type: none;
  margin: 0;
`;

const NavLi = styled.li`
  a {
    height: 100%;
    text-decoration: none;
    padding: 0.6rem 1.4rem;
    font-size: 14px;
    border: none;
    border-radius: 2rem;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    background-color: ${palette.green[2]};
    color: white;

    &:hover,
    &:active,
    &.active {
      background-color: ${palette.green[3]};
      color: white;
    }
  }
`;
