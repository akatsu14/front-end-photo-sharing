import { authTypes } from "../actions/types";
const initialState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case authTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
