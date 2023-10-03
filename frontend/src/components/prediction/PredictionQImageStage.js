import React, { useState } from "react";

import styled from "styled-components";

import { diseaseNameConverter } from "../../util/diseaseName";
import palette from "../../lib/styles/palette";
import catImg from "../../resources/img/cat_h.png";
import dogImg from "../../resources/img/dog_h.png";
import Button from "../UI/Button";

const PredictionQImageStage = (props) => {
  const { textResult, onSubmitImg, onClickPrevStage } = props;
  const [file, setFile] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState("cat");

  const fileChangeHandler = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const changeRadioInputHanlder = (e) => {
    setSelectedSpecies(e.target.value);
  };

  let titleAndExplanation = (
    <Sub>
      피부질환 이미지 분석을 위해 피부질환이 찍힌 이미지를 업로드 해주세요!
    </Sub>
  );

  if (textResult[0] && textResult[1] >= 0.5) {
    titleAndExplanation = (
      <>
        <Title>
          텍스트 분석 결과 예상 피부질환 : {diseaseNameConverter(textResult[0])}
        </Title>
        <Sub>
          <p>
            이미지 분석을 통한 더 정확한 결과를 원하신다면, 피부질환이 찍힌
            이미지를 업로드 해주세요!
          </p>
        </Sub>
      </>
    );
  } else if (textResult[0] && textResult[1] < 0.5) {
    titleAndExplanation = (
      <Sub>
        <p>입력한 텍스트 정보만으로는 피부질환을 예측할 수 없습니다.</p>
        <p>
          이미지를 통해 분석하길 원하신다면, 피부질환이 찍힌 이미지를 업로드
          해주세요!
        </p>
      </Sub>
    );
  }

  return (
    <QImageStageContent>
      {titleAndExplanation}
      <SpeciesSelectingBox>
        <CatBox>
          <img src={catImg} alt="cat" />
          <label>고양이</label>
          <RadioInput
            type="radio"
            value="cat"
            checked={selectedSpecies === "cat"}
            onChange={changeRadioInputHanlder}
          />
        </CatBox>
        <DogBox>
          <img src={dogImg} alt="dog" />
          <label>강아지</label>
          <RadioInput
            type="radio"
            value="dog"
            checked={selectedSpecies === "dog"}
            onChange={changeRadioInputHanlder}
          />
        </DogBox>
      </SpeciesSelectingBox>
      <FileInputBox>
        <UploadName placeholder="첨부파일" value={file ? file.name : ''} disabled />
        <FileInputLabel htmlFor="input-file">Upload</FileInputLabel>
        <FileInput
          type="file"
          id="input-file"
          onChange={fileChangeHandler}
        ></FileInput>
      </FileInputBox>
      <ButtonBox>
        <Button
          theme="basic"
          onClick={() => onSubmitImg(file, selectedSpecies)}
        >
          이미지 분석하기
        </Button>
        <Button theme="outline" onClick={onClickPrevStage}>
          텍스트분석 다시하기
        </Button>
      </ButtonBox>
    </QImageStageContent>
  );
};

export default PredictionQImageStage;

const QImageStageContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 600;
`;

const Sub = styled.div`
  width: 100%;
  font-weight: 300;
  > p {
    text-align: center;
    margin: 8px 0;
  }
`;

const SpeciesSelectingBox = styled.div`
  margin: 2rem 0;
  display: flex;

  label {
    font-weight: 300;
  }
`;

const CatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px;

  > img {
    width: 60px;
    margin-bottom: 6px;
  }
`;

const RadioInput = styled.input`
  position: relative;
  cursor: pointer;
  margin: 6px 0 0;

  &:before {
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transform: scale(0, 0);
    content: "";
    position: absolute;
    top: 0;
    left: 0.125rem;
    z-index: 1;
    width: 0.75rem;
    height: 0.75rem;
    background: ${palette.blue[2]};
    border-radius: 50%;
  }

  &:checked:before {
    transform: scale(1, 1);
  }

  &:after {
    content: "";
    position: absolute;
    top: -0.25rem;
    left: -0.125rem;
    width: 1rem;
    height: 1rem;
    background: #fff;
    border: 2px solid ${palette.gray[2]};
    border-radius: 50%;
  }
`;

const DogBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px;

  > img {
    width: 60px;
    margin-bottom: 6px;
  }
`;

const FileInputBox = styled.div`
  height: 48px;
  width: 320px;
  position: relative;
  margin-bottom: 3rem;
`;

const UploadName = styled.input`
  height: 48px;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
`;

const FileInputLabel = styled.label`
  position: absolute;
  right: 4px;
  top: 4px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 6px;
  color: #fff;
  vertical-align: middle;
  background-color: ${palette.blue[2]};
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${palette.blue[3]};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonBox = styled.div`
  > button {
    margin: 0 3px;

    &:nth-child(2) {
      border: none;
    }
  }
`;
