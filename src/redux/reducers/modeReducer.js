import { modeTypes } from "../actions/types";
const initialState = {
  isBasic: true,
  isAdvance: false,
  isSticky: false,
};
export const modeReducer = (state = initialState, action) => {
  switch (action.type) {
    case modeTypes.SET_BASIC:
    case modeTypes.SET_ADVANCE:
    case modeTypes.SET_STICKY:
      return {
        ...state,
        isBasic: action.payload.isBasic,
        isAdvance: action.payload.isAdvance,
        isSticky: action.payload.isSticky,
      };
    default:
      return state;
  }
};
