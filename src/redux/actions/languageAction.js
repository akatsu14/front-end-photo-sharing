import { languageTypes } from "./types";

export const setVietnamese = () => (dispatch) => {
  dispatch({
    type: languageTypes.SET_VIETNAMESE,
    payload: { language: "vi" },
  });
};

export const setEnglish = () => (dispatch) => {
  dispatch({
    type: languageTypes.SET_ENGLISH,
    payload: { language: "en" },
  });
};

