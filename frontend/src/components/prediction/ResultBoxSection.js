import React from "react";

import styled from "styled-components";
import Button from "../UI/Button";
import palette from "../../lib/styles/palette";
import { diseaseNameConverter } from "../../util/diseaseName";

const ResultBoxSection = ({ imageSrc, jsonResult, onClickPrevStage }) => {
  return (
    <ResultBox>
      <img src={imageSrc} alt="결과이미지" />
      <h3>
        이미지 분석 결과 발견된 피부질환은{" "}
        <span>'{diseaseNameConverter(jsonResult.className)}'</span> 입니다.
      </h3>
      <p>
        본 테스트는 단순 참고용이므로, 피부질환에 대한 더 정확한 진단을 위해서는
        전문의사의 상담을 권장드립니다.
      </p>
      <span>
        *만약 피부 질환 발생 부위가 아닌 다른 부분이 측정됐다면, 피부 질환
        부위가 잘 보이는 다른 이미지를 넣어주세요
      </span>
      <Button theme="outline" onClick={onClickPrevStage}>
        다른 이미지로 업로드하기
      </Button>
    </ResultBox>
  );
};

export default ResultBoxSection;

const ResultBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;

  > h3 {
    font-size: 2rem;
    font-weight: 300;
    margin: 3rem 0 0;

    > span {
      font-weight: 600;
    }
  }

  > p {
    font-size: 18px;
    font-weight: 300;
    margin: 2rem 0 8px;
  }

  > span {
    color: ${palette.gray[6]};
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 2rem;
  }
`;
