import React from "react";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import thridsectionImg from "../../resources/img/thridsection-img.png";

const HomeThirdSection = () => {
  return (
    <HomeThirdSectionBox>
      <Wrapper>
        <LeftSideBox>
          <img src={thridsectionImg} alt="introduction" />
        </LeftSideBox>
        <RightSideBox>
          <Title>
            피부질환으로 고민하는 반려인을 위한
            <br />
            맞춤형 서비스 Skinpet
          </Title>
          <SubBox>
            만만치 않은 반려동물 의료비로 동물병원에 방문하기 두려우신가요?
            <br />
            동물병원에 방문하기 전 skinpet 서비스로 먼저 반려동물의 피부질환에
            대해 확인해보세요! skinpet 서비스는 피부질환 데이터 50만 장을
            기반으로 학습시킨 모델로 분석을 진행합니다.
            <br />
            현재 반려동물의 피부 상태를 입력하여 해당되는 질환을
            파악하고, 이미지 업로드를 통해 더욱 자세히 파악할 수 있습니다.
            의심되는 피부 부위를 선정하여 의심 정도를 퍼센트로 나타내어
            조기치료를 목표로 하고 있습니다. 질환명의 정의 및 증상, 관리방법,
            치료 과정에 대한 내용을 제공합니다.
          </SubBox>
        </RightSideBox>
      </Wrapper>
    </HomeThirdSectionBox>
  );
};

export default HomeThirdSection;

const HomeThirdSectionBox = styled.section`
  height: 600px;
  background-color: ${palette.green[0]};
`;

const Wrapper = styled(Responsive)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSideBox = styled.section`
  flex: 1;
  max-width: 500px;
  > img {
    width: 100%;
  }
`;
const RightSideBox = styled.section`
  margin-left: 3rem;
  flex: 1.5;
  max-width: 0.75rem00px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  line-height: 40px;
`;

const SubBox = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 23px;
  color: ${palette.gray[8]};
  word-break: keep-all;
`;
