import React, { useState } from "react";

const PredictionQImageStage = (props) => {
  const { textResult, imgSubmitHandler, clickPrevStageHandler } = props;
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {textResult && (
        <div>
          텍스트로만 예측된 결과는 {textResult}입니다. 이미지로 다시 확인하기
          원한다면
        </div>
      )}
      피부질환 사진을 올려주세요.
      <input type="file" onChange={handleFileChange} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      
      <button onClick={() => imgSubmitHandler(file)}>submit</button>
      <button onClick={clickPrevStageHandler}>prev</button>
    </div>
  );
};

export default PredictionQImageStage;
