import React, { useContext, useState } from "react";
import PredictionContext from "../store/prediction_context";

const PredictionPage = () => {
  const predictionCtx = useContext(PredictionContext);
  const [textResult, setTextResult] = useState(null);
  const [imgResult, setImgResult] = useState(null);

  const textSubmitHandler = () => {
    console.log("text submit!");
    predictionCtx.onShowLoading();
    // run kobert model
    // save result
    setTextResult("text result");
    predictionCtx.onHideLoading();
    predictionCtx.onClickNextStage();
  };

  const imgSubmitHandler = () => {
    console.log("img submit!");
    predictionCtx.onShowLoading();
    // run yolo model
    // save result
    setImgResult("img result");
    predictionCtx.onHideLoading();
    predictionCtx.onClickNextStage();
  };

  const clickNextStageHandler = () => {
    predictionCtx.onClickNextStage();
  };

  const clickPrevStageHandler = () => {
    predictionCtx.onClickPrevStage();
  };

  let content = "loading...";

  // stage 1: QText
  if (predictionCtx.stage === "QText") {
    content = (
      <div>
        피부질환에 대해 질문하세요.
        <input type="text" />
        <button onClick={textSubmitHandler}>submit</button>
        <button onClick={clickNextStageHandler}>skip</button>
      </div>
    );
  }

  // stage 2: QImage
  if (predictionCtx.stage === "QImage" && predictionCtx.isLoading === false) {
    content = (
      <div>
        {textResult && (
          <div>
            텍스트로만 예측된 결과는 {textResult}입니다. 이미지로 다시 확인하기
            원한다면
          </div>
        )}
        피부질환 사진을 올려주세요.
        <button onClick={imgSubmitHandler}>submit</button>
        <button onClick={clickPrevStageHandler}>prev</button>
      </div>
    );
  }

  // stage 3: result
  if (predictionCtx.stage === "result" && predictionCtx.isLoading === false) {
    content = (
      <div>
        {imgResult && imgResult}
        <button onClick={clickPrevStageHandler}>다른 이미지로 테스트해보기</button>
      </div>
    );
  }

  return <>{content}</>;
};

export default PredictionPage;
