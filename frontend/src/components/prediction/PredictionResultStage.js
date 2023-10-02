import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Button from "../UI/Button";
import { diseaseNameConverter } from "../../util/diseaseName";
import palette from "../../lib/styles/palette";
import AreaFilter from "./AreaFilter";

const PredictionResultStage = (props) => {
  const { jsonResult, imageSrc, onClickPrevStage } = props;
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [hospitalInfoList, setHospitalInfoList] = useState([]);

  useEffect(() => {
    if (jsonResult) {
      try {
        fetch(
          `http://127.0.0.1:8000/api/result/disease_info/${jsonResult.className}`
        ).then((response) => {
          response.json().then((json) => {
            console.log(json);
            setDiseaseInfo(json);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [jsonResult]);

  const hospitalFilterHandler = async (sido, sigungu) => {
    const areas = [sido, sigungu].join("_");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/result/hospital_info/${areas}`
      );

      if (response.ok) {
        const resJson = await response.json();
        console.log(resJson);
        setHospitalInfoList(resJson);
      }
    } catch (err) {
      console.log("err!", err);
    }
  };

  return (
    <ResultStageContent>
      {imageSrc && jsonResult && diseaseInfo ? (
        <>
          <img src={imageSrc} alt="결과이미지" />
          <ResultBox>
            <h3>
              이미지 분석 결과 발견된 피부질환은{" "}
              <span>'{diseaseNameConverter(jsonResult.className)}'</span>{" "}
              입니다.
            </h3>
            <p>
              피부질환에 대한 더 정확한 진단을 위해서는 전문의사의 상담을
              권장드립니다.
            </p>
            <span>
              *만약 피부 질환 발생 부위가 아닌 다른 부분이 측정됐다면, 피부 질환
              부위가 잘 보이는 다른 이미지를 넣어주세요
            </span>
            <Button theme="outline" onClick={onClickPrevStage}>
              다른 이미지로 업로드하기
            </Button>
          </ResultBox>
          <DiseaseInfoBox>
            <Title>{diseaseNameConverter(diseaseInfo.title)} 질환정보</Title>
            {/* <img src="" alt=""/> */}
            <p>{diseaseInfo.definition}</p>
            <Sub>증상</Sub>
            <p>{diseaseInfo.symptoms}</p>
            <Sub>관리방법</Sub>
            <p>
              {diseaseInfo.care_method.split("/").map((cm, idx) => {
                return <span key={idx}>- {cm}</span>;
              })}
            </p>
            <Sub>치료과정</Sub>
            <p>
              {diseaseInfo.treatment_process.split("/").map((tp, idx) => {
                return <span key={idx}>- {tp}</span>;
              })}
            </p>
          </DiseaseInfoBox>
          <HospitalInfoBox>
            <Title>병원 정보</Title>
            <AreaFilter onFilter={hospitalFilterHandler} />
            {hospitalInfoList.length > 0 && hospitalInfoList.map((hospitalInfo) => {
              return <p key={hospitalInfo.id}>{hospitalInfo.name}</p>;
            })}
          </HospitalInfoBox>
        </>
      ) : (
        <Button theme="outline" onClick={onClickPrevStage}>
          다른 이미지로 업로드하기
        </Button>
      )}
    </ResultStageContent>
  );
};

export default PredictionResultStage;

const ResultStageContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }
`;

const ResultBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 5rem;

  > h3 {
    font-size: 2rem;
    font-weight: 300;
    margin: 0;

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
    color: ${palette.gray[5]};
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 2rem;
  }
`;

const DiseaseInfoBox = styled.section`
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;

  p {
    margin: 0 0 24px;
  }

  span {
    display: block;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
`;

const Sub = styled.h4`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 8px;
`;

const HospitalInfoBox = styled.section`
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
`;
