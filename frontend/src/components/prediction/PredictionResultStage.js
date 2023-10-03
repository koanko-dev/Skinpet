import React, { useEffect, useState } from "react";

import styled from "styled-components";

import a1Img from "../../resources/img/diseaseImgs/a1.jpg";
import a2Img from "../../resources/img/diseaseImgs/a2.jpg";
import a3Img from "../../resources/img/diseaseImgs/a3.jpg";
import a4Img from "../../resources/img/diseaseImgs/a4.jpg";
import a5Img from "../../resources/img/diseaseImgs/a5.jpg";
import a6Img from "../../resources/img/diseaseImgs/a6.jpg";
import ResultBoxSection from "./ResultBoxSection";
import DiseaseInfoSection from "./DiseaseInfoSection";
import HospitalInfoSection from "./HospitalInfoSection";

const PredictionResultStage = (props) => {
  const { jsonResult, imageSrc, onClickPrevStage } = props;
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [skinDiseaseImg, setSkinDiseaseImg] = useState(null);
  const [hospitalInfoList, setHospitalInfoList] = useState([]);

  useEffect(() => {
    if (jsonResult) {
      try {
        fetch(
          `http://127.0.0.1:8000/api/result/disease_info/${jsonResult.className}`
        ).then((response) => {
          response.json().then((json) => {
            setDiseaseInfo(json);

            switch (json.title) {
              case "A1_구진_플라크":
                setSkinDiseaseImg(a1Img);
                break;
              case "A2_비듬_각질_상피성잔고리":
                setSkinDiseaseImg(a2Img);
                break;
              case "A3_태선화_과다색소침착":
                setSkinDiseaseImg(a3Img);
                break;
              case "A4_농포_여드름":
                setSkinDiseaseImg(a4Img);
                break;
              case "A5_미란_궤양":
                setSkinDiseaseImg(a5Img);
                break;
              case "A6_결절_종괴":
                setSkinDiseaseImg(a6Img);
                break;
              default:
                setSkinDiseaseImg(a1Img);
            }
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
        setHospitalInfoList(resJson);
      }
    } catch (err) {
      console.log("err!", err);
    }
  };

  return (
    <ResultStageContent>
      {imageSrc && jsonResult && diseaseInfo && (
        <>
          <ResultBoxSection
            imageSrc={imageSrc}
            jsonResult={jsonResult}
            onClickPrevStage={onClickPrevStage}
          />
          <DiseaseInfoSection
            diseaseInfo={diseaseInfo}
            skinDiseaseImg={skinDiseaseImg}
          />
          <HospitalInfoSection
            hospitalFilterHandler={hospitalFilterHandler}
            hospitalInfoList={hospitalInfoList}
          />
        </>
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
