import React from "react";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import Button from "../UI/Button";
import palette from "../../lib/styles/palette";
import mainImg from '../../resources/img/home_img.png'

const HomeFirstSection = () => {
  return (
    <HomeFirstSectionBox>
      <Wrapper>
        <TitleSideBox>
          <Title>
            쉽고 빠른
            <br />
            반려동물 피부질환 분석
          </Title>
          <SubBox>
            <Sub>
              빠른 진단을 통해 원인이 다양하고 치료가 어려운 반려동물 피부질환의
              특성을 파악해보세요! 병원에 방문하기 전 해당 질병에 대한 정보 및
              치료 과정에 대해 알아볼 수 있습니다. 조기치료를 통해 반려동물과
              함께 하는 라이프를 즐겨보세요!
            </Sub>
            <Button theme="basic" size="large">피부질환 분석해보기</Button>
          </SubBox>
        </TitleSideBox>
        <ImageSideBox>
            <img src={mainImg} />
        </ImageSideBox>
      </Wrapper>
    </HomeFirstSectionBox>
  );
};

export default HomeFirstSection;

const HomeFirstSectionBox = styled.section`
  height: 700px;
  background-color: ${palette.green[0]};
`;

const Wrapper = styled(Responsive)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleSideBox = styled.div`
  flex: 1;
  max-width: 500px;
  /* display: flex;
  flex-direction: column; */
`;

const Title = styled.h2`
    font-size: 42px;
    font-weight: 800;
`;

const SubBox = styled.div`
    font-size: 18px;
    font-weight: 300;
`;

const Sub = styled.p``;

const ImageSideBox = styled.div`
  flex: 1;
  max-width: 500px;

  > img {
    width: 100%;
  }
`;