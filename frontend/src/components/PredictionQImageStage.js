import React, { useState } from "react";
import { diseaseNameConverter } from "../util/diseaseName";

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
    setSelectedSpecies(e.target.value)
  };

  return (
    <div>
      {textResult.length > 0 && (
        <div>
          텍스트로만 예측된 결과는 {diseaseNameConverter(textResult[0])}입니다.<br/>
          확률: {textResult[1]}<br/>
          이미지로 다시 확인하기 원한다면 
        </div>
      )}
      피부질환 사진을 올려주세요.
      <input type="file" onChange={fileChangeHandler} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      <form>
        <label>고양이</label>
        <input type="radio" value="cat" checked={selectedSpecies === "cat"}  onChange={changeRadioInputHanlder} />
        <label>강아지</label>
        <input type="radio" value="dog" checked={selectedSpecies === "dog"} onChange={changeRadioInputHanlder} />
      </form>
      <button onClick={() => onSubmitImg(file, selectedSpecies)}>submit</button>
      <button onClick={onClickPrevStage}>prev</button>
    </div>
  );
};

export default PredictionQImageStage;
