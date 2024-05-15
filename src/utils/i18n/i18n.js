import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import { KEY_STORAGE } from "../../common/constants";
import { load } from "../../common/functions";
import { resources } from "./locales";

export const initOptionsI18n = (source) => {
  let savedLanguage = load(KEY_STORAGE.LANGUAGE);

  return {
    fallbackLng: savedLanguage || "en",
    lng: savedLanguage || "en",
    resources: source,

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    // cache: {
    //   enabled: true
    // },

    interpolation: {
      // not needed for react as it does escape per default to prevent xss!
      escapeValue: false,
    },
  };
};

/**
 * Config i18n for app
 */
i18n.use(initReactI18next).init(initOptionsI18n(resources));

export default i18n;
