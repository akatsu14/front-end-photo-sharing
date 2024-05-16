import { onlineTypes } from "../actions/types";

const initialState = {
  onlineUsers: [],
};
export const onlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case onlineTypes.SET_OFFLINE:
      return {
        onlineUsers: state?.onlineUsers.filter(
          (userId) => userId !== action?.payload
        ),
      };
    case onlineTypes.SET_ONLINE:
      return {
        onlineUsers: action?.payload,
      };
    default:
      return state;
  }
};
