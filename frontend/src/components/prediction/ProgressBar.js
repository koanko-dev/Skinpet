import React, { useContext } from "react";

import styled from "styled-components";
import PredictionContext from "../../store/prediction_context";
import palette from "../../lib/styles/palette";

const ProgressBar = () => {
  const predictionCtx = useContext(PredictionContext);

  return (
    <ProgressBarBox>
      <ProgressBarTitle>피부질환 분석</ProgressBarTitle>
      <BarBox>
        <Progress stage={predictionCtx.stage}></Progress>
        <CircleBox
          isactive={
            predictionCtx.stage === "QText" ||
            predictionCtx.stage === "QImage" ||
            predictionCtx.stage === "result"
          }
        >
          <Circle
            isactive={
              predictionCtx.stage === "QText" ||
              predictionCtx.stage === "QImage" ||
              predictionCtx.stage === "result"
            }
          >
            1
          </Circle>
          <p>텍스트분석</p>
        </CircleBox>
        <CircleBox
          isactive={
            predictionCtx.stage === "QImage" || predictionCtx.stage === "result"
          }
        >
          <Circle
            isactive={
              predictionCtx.stage === "QImage" ||
              predictionCtx.stage === "result"
            }
          >
            2
          </Circle>
          <p>이미지분석</p>
        </CircleBox>
        <CircleBox isactive={predictionCtx.stage === "result"}>
          <Circle isactive={predictionCtx.stage === "result"}>3</Circle>
          <p>분석결과</p>
        </CircleBox>
      </BarBox>
    </ProgressBarBox>
  );
};

export default ProgressBar;

const ProgressBarBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const ProgressBarTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
`;

const BarBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;
  max-width: 100%;
  width: 600px;

  &::before {
    content: "";
    background-color: ${palette.gray[3]};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 5px;
    width: 100%;
    z-index: -1;
  }
`;

const activeProgress = ({ stage }) => {
  if (stage === "QText") {
    return "width: 0%";
  } else if (stage === "QImage") {
    return "width: 50%";
  } else if (stage === "result") {
    return "width: 100%";
  }
  return "width: 0%";
};

const Progress = styled.div`
  background-color: ${palette.blue[2]};
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 5px;
  width: 0%;
  z-index: -1;
  transition: 0.4s ease;
  ${activeProgress}
`;

const activeP = ({ isactive }) => {
  if (isactive) {
    return `
        color: ${palette.blue[2]};
      `;
  }
  return null;
};

const CircleBox = styled.div`
  position: relative;
  > p {
    color: ${palette.gray[5]};
    position: absolute;
    width: max-content;
    left: 50%;
    top: 24px;
    transform: translateX(-50%);
    transition: 0.4s ease;
    ${activeP}
  }
`;

const activeCircle = ({ isactive }) => {
  if (isactive) {
    return `
        border-color: ${palette.blue[2]};
        color: ${palette.blue[2]};
      `;
  }
  return null;
};

const Circle = styled.div`
  background-color: #fff;
  color: ${palette.gray[5]};
  font-weight: 600;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid ${palette.gray[3]};
  transition: 0.4s ease;
  ${activeCircle}
`;
