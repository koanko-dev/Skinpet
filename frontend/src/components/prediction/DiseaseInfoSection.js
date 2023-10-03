import React from "react";

import styled from "styled-components";

import { diseaseNameConverter } from "../../util/diseaseName";
import palette from "../../lib/styles/palette";

const DiseaseInfoSection = ({diseaseInfo, skinDiseaseImg}) => {
  return (
    <DiseaseInfoBox>
      <Title>{diseaseNameConverter(diseaseInfo.title)} 질환정보</Title>
      <img src={skinDiseaseImg} alt="skin disease" />
      <p>{diseaseInfo.definition}</p>
      <Sub>증상</Sub>
      <p>
        {diseaseInfo.symptoms.includes("/")
          ? diseaseInfo.symptoms.split("/").map((s, idx) => {
              return <span key={idx}>- {s}</span>;
            })
          : diseaseInfo.symptoms}
      </p>
      <Sub>관리방법</Sub>
      <p>
        {diseaseInfo.care_method.includes("/")
          ? diseaseInfo.care_method.split("/").map((cm, idx) => {
              return <span key={idx}>- {cm}</span>;
            })
          : diseaseInfo.care_method}
      </p>
      <Sub>치료과정</Sub>
      <p>
        {diseaseInfo.treatment_process.includes("/")
          ? diseaseInfo.treatment_process.split("/").map((tp, idx) => {
              return <span key={idx}>- {tp}</span>;
            })
          : diseaseInfo.treatment_process}
      </p>
    </DiseaseInfoBox>
  );
};

export default DiseaseInfoSection;


const DiseaseInfoBox = styled.section`
  width: 100%;
  margin-bottom: 3rem;
  background-color: ${palette.green[0]};
  border-radius: 12px;
  padding: 5rem 3rem 4rem;
  line-height: 22px;

  p {
    margin: 0 0 32px;
  }

  span {
    display: block;
    margin-bottom: 14px;
  }

  > img {
    margin-bottom: 8px;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 1.5rem;
  text-align: center;
`;

const Sub = styled.h4`
  font-size: 24px;
  font-weight: 500;
  margin: 42px 0 22px;
`;