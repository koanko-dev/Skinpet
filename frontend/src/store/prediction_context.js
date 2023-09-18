import React, { useState } from "react";

const PredictionContext = React.createContext({
  stage: "QText",
  isLoading: false,
  onClickNextStage: () => {},
  onClickPrevStage: () => {},
  onShowLoading: () => {},
  onHideLoading: () => {},
});

export const PredictionContextProvider = (props) => {
  const stages = ["QText", "QImage", "result"];
  const [stageNum, setStageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const clickNextStageHandler = () => {
    setStageNum(stageNum + 1);
  };

  const clickPrevStageHandler = () => {
    setStageNum(stageNum - 1);
  };

  const showLoadingHandler = () => {
    setIsLoading(true);
  };

  const hideLoadingHandler = () => {
    setIsLoading(false);
  };

  return (
    <PredictionContext.Provider
      value={{
        stage: stages[stageNum],
        isLoading: isLoading,
        onClickNextStage: clickNextStageHandler,
        onClickPrevStage: clickPrevStageHandler,
        onShowLoading: showLoadingHandler,
        onHideLoading: hideLoadingHandler,
      }}
    >
      {props.children}
    </PredictionContext.Provider>
  );
};

export default PredictionContext;
