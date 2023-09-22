import React, { useContext, useState } from "react";
import PredictionContext from "../store/prediction_context";
import PredictionQImageStage from "../components/PredictionQImageStage";
import PredictionResultStage from "../components/PredictionResultStage";
import PredictionQTextStage from "../components/PredictionQTextStage";

const PredictionPage = () => {
  const predictionCtx = useContext(PredictionContext);
  const [textResult, setTextResult] = useState([]);
  const [jsonResult, setJsonResult] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const textSubmitHandler = async (text) => {
    console.log("text submit!", text);
    predictionCtx.onShowLoading();

    // run kobert model
    // save result
    try {
      const endpoint = "http://127.0.0.1:8000/api/text/text_diagnosis";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      if (response.ok) {
        const json = await response.json();
        const text_result = json.result.split('/');
        setTextResult(text_result);
      }
    } catch (err) {
      console.log("err!", err);
    }

    predictionCtx.onHideLoading();
    predictionCtx.onClickNextStage();
  };

  const imgSubmitHandler = async (file, selectedSpecies) => {
    if (!file) {
      return;
    }
    predictionCtx.onShowLoading();

    let targetIdx = 0;

    // run yolo model
    // fetch detected json result
    try {
      const formData = new FormData();
      const extra_data = {
        text_result: textResult[0],
        species: selectedSpecies,
      };
      formData.append("file", file);
      formData.append("extra_data", JSON.stringify(extra_data));

      const endpoint = "http://127.0.0.1:8000/api/result/detected_json";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        const results = json.results;
        console.log("res json results: ", results);

        let target_confidence = 0;
        let target_disease_idx = 0;

        for (let [idx, disease_json] of results.entries()) {
          for (let box of disease_json) {
            if (target_confidence < box.confidence) {
              target_confidence = box.confidence;
              target_disease_idx = idx;
              targetIdx = idx;
            }
          }
        }

        const result = {
          className: results[target_disease_idx][0].name,
          confidence: target_confidence,
        };
        setJsonResult(result);
      }
    } catch (err) {
      console.log("err!", err);
    }

    // fetch detected img result
    try {
      const endpoint = "http://127.0.0.1:8000/api/result/detected_img";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target_index: targetIdx }),
      });

      if (response.ok) {
        console.log("target idx of results: ", targetIdx);
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
      <PredictionQTextStage
        onTextSubmit={textSubmitHandler}
        onClickNextStage={clickNextStageHandler}
      />
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
      <PredictionResultStage
        jsonResult={jsonResult}
        imageSrc={imageSrc}
        onClickPrevStage={clickPrevStageHandler}
      />
    );
  }

  return <>{content}</>;
};

export default PredictionPage;
