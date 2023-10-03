import React from "react";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import cardOneImg from "../../resources/img/card-one-img.png";
import cardTwoImg from "../../resources/img/card-two-img.png";
import cardThreeImg from "../../resources/img/card-three-img.png";
import { ReactComponent as ArrowSvg } from "../../resources/img/two-line-arrow.svg";

const HomeSecondSection = () => {
  return (
    <HomeSecondSectionBox>
      <Wrapper>
        <Title>
          스킨펫의 피부질환 분석
          <br />3 Easy Steps!
        </Title>
        <ThreeStepsBox>
          <StepCard>
            <StepCardNumber>01</StepCardNumber>
            <ImgContentBox>
              <StepCardImg>
                <img src={cardOneImg} alt="first step" />
              </StepCardImg>
              <StepCardContent>
                <h5>피부질환 텍스트분석</h5>
                <p>현재 반려동물의 피부질환 상태를 간단하게 입력합니다.</p>
              </StepCardContent>
            </ImgContentBox>
          </StepCard>
          <ArrowBox>
            <ArrowSvg />
          </ArrowBox>
          <StepCard>
            <StepCardNumber>02</StepCardNumber>
            <ImgContentBox>
              <StepCardImg>
                <img src={cardTwoImg} alt="second step" />
              </StepCardImg>
              <StepCardContent>
                <h5>피부질환 이미지분석</h5>
                <p>
                  텍스트 분석을 기반으로 질환을 예측하기 위해, 반려동물 이미지를
                  분석합니다.
                </p>
              </StepCardContent>
            </ImgContentBox>
          </StepCard>
          <ArrowBox>
            <ArrowSvg />
          </ArrowBox>
          <StepCard>
            <StepCardNumber>03</StepCardNumber>
            <ImgContentBox>
              <StepCardImg>
                <img src={cardThreeImg} alt="third step" />
              </StepCardImg>
              <StepCardContent>
                <h5>피부질환 분석 결과</h5>
                <p>분석된 결과와 질환 정보 및 병원 정보를 제공합니다.</p>
              </StepCardContent>
            </ImgContentBox>
          </StepCard>
        </ThreeStepsBox>
      </Wrapper>
    </HomeSecondSectionBox>
  );
};

export default HomeSecondSection;

const HomeSecondSectionBox = styled.section`
  padding: 4rem 0 0;
  height: 700px;
  background-color: white;
`;

const Wrapper = styled(Responsive)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`;

const ThreeStepsBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepCard = styled.div`
  width: 280px;
  height: 390px;
  background-color: ${palette.green[0]};
  border-radius: 20px;
  padding: 1.5rem 1.5rem 2rem;
`;

const ArrowBox = styled.div`
  width: 1.6rem;
  > svg {
    width: 100%;
  }
`;

const StepCardNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: white;
`;

const ImgContentBox = styled.div`
  position: relative;
  top: -1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCardImg = styled.div`
  width: 132px;
  > img {
    width: 100%;
  }
`;

const StepCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${palette.gray[8]};

  > h5 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 12px 0 10px;
  }

  > p {
    font-weight: 300;
    margin: 0;
    font-size: 14px;
    padding: 0 8px;
    word-break: keep-all;
  }
`;
