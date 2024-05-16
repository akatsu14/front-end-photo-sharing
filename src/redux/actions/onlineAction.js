import { onlineTypes } from "./types";

export const setOnline = (listUser) => (dispatch) => {
  dispatch({
    type: onlineTypes.SET_ONLINE,
    payload: listUser,
  });
};
export const setOffline = (userId) => (dispatch) => {
  dispatch({
    type: onlineTypes.SET_OFFLINE,
    payload: userId,
  });
};
