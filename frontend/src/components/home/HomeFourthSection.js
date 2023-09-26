import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import Button from "../UI/Button";
import petsImg from "../../resources/img/pets.png";

const HomeFourthSection = () => {
  return (
    <HomeFourthSectionBox>
      <Wrapper>
        <TextBox>
          <Title>오랫동안 건강할 수 있도록!</Title>
          <Sub>
            사랑하는 반려동물의 피부질환이 걱정된다면, 지금 바로 피부질환
            테스트를 해보세요.
          </Sub>
          <ButtonBox>
            <Link to='/prediction'>
                <Button theme="basic" size="large">
                피부질환 분석해보기
                </Button>
            </Link>
          </ButtonBox>
        </TextBox>
        <ImgBox>
          <img src={petsImg} />
        </ImgBox>
      </Wrapper>
    </HomeFourthSectionBox>
  );
};

export default HomeFourthSection;

const HomeFourthSectionBox = styled.section`
  padding: 4rem 0 0;
  height: 600px;
  background-color: white;
`;

const Wrapper = styled(Responsive)``;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
`;

const Sub = styled.p`
  text-align: center;
  margin: 0 0 1.7rem;
  font-size: 1rem;
  font-weight: 400;
`;

const ButtonBox = styled.div`
  margin: 0 auto;
`;

const ImgBox = styled.div`
    > img {
        width: 100%;
    }
`;
