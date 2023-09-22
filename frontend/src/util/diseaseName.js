export const diseaseNameConverter = (rawDisease) => {
  let diseaseName = "";

  if (rawDisease === "A1_구진_플라크") {
    diseaseName = "구진/플라크";
  } else if (rawDisease === "A2_비듬_각질_상피성잔고리") {
    diseaseName = "비듬/각질/상피성잔고리";
  } else if (rawDisease === "A3_태선화_과다색소침착") {
    diseaseName = "태선화/과다색소침착";
  } else if (rawDisease === "A4_농포_여드름") {
    diseaseName = "농포/여드름";
  } else if (rawDisease === "A5_미란_궤양") {
    diseaseName = "미란/궤양";
  } else if (rawDisease === "A6_결절_종괴") {
    diseaseName = "결절/종괴";
  }

  return diseaseName;
};
