import { authTypes } from "./types";

export const setAuth =
  ({ isAuthenticated, user }) =>
  (dispatch) => {
    dispatch({ type: authTypes.SET_AUTH, payload: { isAuthenticated, user } });
  };

export const setUser = ({user})=>(dispatch)=>{
  dispatch({type:authTypes.SET_USER,payload:{user}});
}