import html2canvas from "html2canvas";
import fetchModel from "../lib/fetchModelData";
import { setAuth } from "../redux/actions/authAction";
import { socketChat } from "../utils/socketComment";
import { KEY_STORAGE, colorImages } from "./constants";

export const loadUser = async (dispatch, isAuthenticated = false) => {
  if (!getAuthToken()) {
    saveAuthToken(getAuthToken());
  } else {
    try {
      const response = await fetchModel("/api/user/me");
      if (response.success)
        dispatch(setAuth({ isAuthenticated: true, user: response.data }));
      else {
        dispatch(setAuth({ isAuthenticated: false, user: null }));
        if (isAuthenticated)
          functionAlert(
            "Thông báo",
            "Đã quá thời gian đăng nhập \nMời bạn đăng nhập lại để tiếp tục sử dụng",
            location.reload(),
            location.reload()
          );
      }
    } catch (error) {
      console.log("🚀 ~ loadUser ~ error:", error);
      localStorage.removeItem(KEY_STORAGE.TOKEN);
      saveAuthToken(null);
      dispatch(setAuth({ isAuthenticated: false, user: null }));
      if (isAuthenticated)
        functionAlert(
          "Thông báo",
          "Đã quá thời gian đăng nhập \nMời bạn đăng nhập lại để tiếp tục sử dụng",
          location.reload(),
          location.reload()
        );
    }
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

export const logout = async (dispatch, user) => {
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
      if (res?.success) {
        socketChat.emit("user-offline", body.id);
        saveAuthToken(null);
        dispatch(setAuth({ isAuthenticated: false, user: null }));
      }

      // location.reload();
    } else {
      location.reload();
      socketChat.emit("user-offline", user._id);
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

export const file2Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};

export const getColorForAvatar = (i) => {
  const numOfColor = colorImages.length + 1;

  // value i là chữ cái
  // return màu tương ứng với chữ cái
  return colorImages[
    (i?.toLowerCase()?.charCodeAt(0) - "a"?.charCodeAt(0)) % numOfColor
  ];
};

export const convertTextToBase64 = async (textElement) => {
  try {
    const canvas = await html2canvas(textElement);
    const base64Image = canvas.toDataURL("image/png");
    console.log("🚀 ~ convertTextToBase64 ~ base64Image:", base64Image)
    return base64Image;
  } catch (err) {}
};
