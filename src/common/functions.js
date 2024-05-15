import fetchModel from "../lib/fetchModelData";
import { setAuth } from "../redux/actions/authAction";
import { KEY_STORAGE } from "./constants";

export const loadUser = async (dispatch) => {
  if (getAuthToken()) {
    saveAuthToken(getAuthToken());
  }
  try {
    const response = await fetchModel("/api/user/me");
    if (response.success)
      dispatch(setAuth({ isAuthenticated: true, user: response.data }));
  } catch (error) {
    console.log("🚀 ~ loadUser ~ error:", error);
    localStorage.removeItem(KEY_STORAGE.TOKEN);
    saveAuthToken(null);
    dispatch(setAuth({ isAuthenticated: false, user: null }));
  }
};
export const load = (key) => {
  try {
    const value = localStorage.getItem(key);
    return typeof value === "string" ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};
export const saveAuthToken = (token) => {
  localStorage.setItem(KEY_STORAGE.TOKEN, token);
  // const myTime = setTimeout(() => {
  //   localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  //   functionAlert(
  //     "Thông báo",
  //     "Đã quá thời gian đăng nhập \nMời bạn đăng nhập lại để tiếp tục sử dụng",
  //     location.reload(),
  //     location.reload()
  //   );
  //   console.log("🚀 ~ myTime ~ myTime:", myTime);
  // }, TTL);

  // console.log("🚀 ~ myTime ~ myTime:", myTime);
};

export const setLanguage = (lang) => {
  localStorage.setItem(KEY_STORAGE.LANGUAGE, lang);
};
export const getAuthToken = () => {
  return localStorage.getItem(KEY_STORAGE.TOKEN);
};
export const TimeOutOrStop = (stop) => {
  if (!stop) {
  } else {
  }
};

export const logout = async (dispatch) => {
  try {
    // TimeOutOrStop(true);

    const resMe = await fetchModel("/api/user/me");
    console.log("🚀 ~ logOut ~ resMe:", resMe);
    const body = {
      id: resMe?.data?._id,
      version: resMe?.data?.version,
    };
    if (resMe.success) {
      const res = await fetchModel(
        "/admin/logout",
        "post",
        JSON.stringify(body)
      );
      console.log("🚀 ~ logOut ~ res:", res);
      saveAuthToken(null);
      dispatch(setAuth({ isAuthenticated: false, user: null }));
      // location.reload();
    }
  } catch (error) {
    console.log("🚀 ~ logOut ~ error:", error);
  }
};
export const functionAlert = (notice, content, onPressCancel, onPressOk) => {
  const isConfirm = confirm(`${notice}\n${content}`);
  if (isConfirm) {
    onPressOk && onPressOk();
  } else {
    onPressCancel && onPressCancel();
  }
};
