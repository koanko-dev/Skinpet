import React, { useState } from "react";
import styled from "styled-components";

import Button from "./UI/Button";
import palette from "../lib/styles/palette";

const PredictionQTextStage = (props) => {
  const { onTextSubmit, onClickNextStage } = props;
  const [inputText, setInputText] = useState("");

  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <QTextStageContent>
      <Title>반려동물 피부질환, 간단한 정보로 진단해보세요!</Title>
      <Subtitle>
        <p>텍스트를 통한 피부질환 예측을 위해</p>
        <p>반려동물의 상태를 간단하게 말해주세요.</p>
      </Subtitle>
      <TextInput type="text" value={inputText} placeholder="상태에 대해 입력하세요" onChange={inputChangeHandler} />
      <ButtonBox>
        <Button theme="basic" onClick={() => onTextSubmit(inputText)}>
          확인하기
        </Button>
        <Button theme="outline" onClick={onClickNextStage}>
          건너뛰기
        </Button>
      </ButtonBox>
    </QTextStageContent>
  );
};

export default PredictionQTextStage;

const QTextStageContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2``;

const Subtitle = styled.h4`
  width: 100%;
  font-weight: normal;
  > p {
    text-align: center;
    margin: 8px 0;
  }
`;
const TextInput = styled.input`
  height: 48px;
  width: 540px;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: ${palette.green[1]};
    outline: none;
  }
  &::placeholder {
    color: ${palette.gray[5]};
  }
`;

const ButtonBox = styled.div`
  margin-top: 2rem;

  > button {
    margin: 0 3px;

    &:nth-child(2) {
      border: none;
    }
  }
`;
