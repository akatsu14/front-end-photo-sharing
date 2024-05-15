import { modeTypes } from "./types";

export const setBasic = () => (dispatch) => {
  dispatch({
    type: modeTypes.SET_BASIC,
    payload: {
      isBasic: true,
      isAdvance: false,
      isSticky: false,
    },
  });
};

export const setAdvance = () => (dispatch) => {
  dispatch({
    type: modeTypes.SET_ADVANCE,
    payload: {
      isBasic: false,
      isAdvance: true,
      isSticky: false,
    },
  });
};

export const setSticky = () => (dispatch) => {
  dispatch({
    type: modeTypes.SET_STICKY,
    payload: {
      isBasic: false,
      isAdvance: false,
      isSticky: true,
    },
  });
};
