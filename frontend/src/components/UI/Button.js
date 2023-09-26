import React from "react";

import styled from "styled-components";
import palette from "../../lib/styles/palette";

const Button = ({ to, onClick, disabled, theme, size, type, children }) => {
  return (
    <BasicButton
      href={to}
      onClick={onClick}
      disabled={disabled}
      theme={theme}
      size={size}
      type={type}
    >
      {children}
    </BasicButton>
  );
};

export default Button;

const basic =
  () =>
  ({ theme }) => {
    if (theme === "basic") {
      return `
        color: white;
        background-color: ${palette.green[2]};
        &:hover {
            background-color: ${palette.green[3]};
        }
        `;
    }
    return null;
  };

const point =
  () =>
  ({ theme }) => {
    if (theme === "point") {
      return `
        color: white;
        background-color: ${palette.point[0]};
        &:hover {
            background-color: ${palette.point[1]};
        }
        `;
    }
    return null;
  };

const outline =
  () =>
  ({ theme }) => {
    if (theme === "outline") {
      return `
        color: ${palette.green[3]};
        background-color: transparent;
        border: 1px solid ${palette.green[3]};
        `;
    }
    return null;
  };

const outlinePoint =
  () =>
  ({ theme }) => {
    if (theme === "outlinePoint") {
      return `
        color: ${palette.point[0]};
        background-color: transparent;
        border: 1px solid ${palette.point[0]};
        `;
    }
    return null;
  };

const outlineBlack =
  () =>
  ({ theme }) => {
    if (theme === "outlineBlack") {
      return `
        color: ${palette.gray[7]};
        background-color: transparent;
        border: 1px solid ${palette.gray[7]};
        `;
    }
    return null;
  };

const full =
  () =>
  ({ size }) => {
    if (size === "full") {
      return `
        width: 100%;
        padding: 5%;
        font-weight: 600;
        `;
    }
    return null;
  };

const small =
  () =>
  ({ size }) => {
    if (size === "small") {
      return `
        padding: 4px 12px;
        height: fit-content;
        `;
    }
    return null;
  };

const BasicButton = styled.button`
  padding: 0.5rem 1.2rem;
  color: ${palette.gray[8]};
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  border: none;
  border-radius: 2rem;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  ${basic}
  ${point}
  ${outline}
  ${outlinePoint}
  ${outlineBlack}
  ${full}
  ${small}
`;
