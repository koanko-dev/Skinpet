import React, { useState } from "react";

const PredictionQTextStage = (props) => {
  const { onTextSubmit, onClickNextStage } = props;
  const [inputText, setInputText] = useState("");

  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      피부질환에 대해 질문하세요.
      <input type="text" value={inputText} onChange={inputChangeHandler} />
      <button onClick={() => onTextSubmit(inputText)}>submit</button>
      <button onClick={onClickNextStage}>skip</button>
    </div>
  );
};

export default PredictionQTextStage;
