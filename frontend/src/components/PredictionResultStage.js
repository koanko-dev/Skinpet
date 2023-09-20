import React from "react";

const PredictionResultStage = (props) => {
  const { jsonResult, imageSrc, onClickPrevStage } = props;

  return (
    <div>
      {jsonResult && (
        <div>
          <p>{jsonResult.className}</p>
          <p>{jsonResult.confidence}</p>
        </div>
      )}
      {imageSrc && <img src={imageSrc} alt="결과이미지" />}
      <button onClick={onClickPrevStage}>
        다른 이미지로 테스트해보기
      </button>
    </div>
  );
};

export default PredictionResultStage;
