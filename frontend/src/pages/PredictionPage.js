import React, { useContext, useState } from "react";
import PredictionContext from "../store/prediction_context";
import PredictionQImageStage from "../components/PredictionQImageStage";
import PredictionResultStage from "../components/PredictionResultStage";

const PredictionPage = () => {
  const predictionCtx = useContext(PredictionContext);
  const [textResult, setTextResult] = useState(null);
  const [imgResult, setImgResult] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const textSubmitHandler = () => {
    console.log("text submit!");
    predictionCtx.onShowLoading();
    // run kobert model
    // save result
    setTextResult("text result");
    predictionCtx.onHideLoading();
    predictionCtx.onClickNextStage();
  };

  const imgSubmitHandler = async (file) => {
    if (!file) {
      return;
    }
    predictionCtx.onShowLoading();

    const formData = new FormData();
    formData.append("file", file);

    // run yolo model
    try {
      const endpoint = "http://127.0.0.1:8000/api/result/detection";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        console.log("res json", json.result);

        const result = {
          class: json.result[0].class,
          confidence: json.result[0].confidence,
        };
        setImgResult(result);
      }
    } catch (err) {
      //   console.log("err!", err);
    }

    try {
      const endpoint = "http://127.0.0.1:8000/api/result/detected_img";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      }
    } catch (err) {
      console.log("err!", err);
    }

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
      <PredictionQImageStage
        textResult={textResult}
        onSubmitImg={imgSubmitHandler}
        onClickPrevStage={clickPrevStageHandler}
      />
    );
  }

  // stage 3: result
  if (predictionCtx.stage === "result" && predictionCtx.isLoading === false) {
    content = (
      <PredictionResultStage imgResult={imgResult} imageSrc={imageSrc} onClickPrevStage={clickPrevStageHandler} />
    );
  }

  return <>{content}</>;
};

export default PredictionPage;
