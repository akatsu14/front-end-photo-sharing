import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import { languageReducer } from "../reducers/languageReducer";
import { modeReducer } from "../reducers/modeReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: modeReducer,
    language: languageReducer,
  },
});
export default store;
