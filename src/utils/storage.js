const KEYS = {
  TOKEN: "token",
  PROFILE_LIST: "profile_list",
  SELECTED_PROFILE: "selected_profile",
  LOGIN_MOBILE_NUMBER: "login_mobile_number",
  CODE_VERIFIER: "code_verifier",
  AUTH_STATE: "auth_state",
};

export const storage = {
  getToken: () => localStorage.getItem(KEYS.TOKEN),
  setToken: (token) => localStorage.setItem(KEYS.TOKEN, token),
  clearToken: () => localStorage.removeItem(KEYS.TOKEN),

  getLoginMobileNumber: () =>
    localStorage.getItem(KEYS.LOGIN_MOBILE_NUMBER) || "",
  setLoginMobileNumber: (mobile) =>
    localStorage.setItem(KEYS.LOGIN_MOBILE_NUMBER, mobile),
  clearLoginMobileNumber: () =>
    localStorage.removeItem(KEYS.LOGIN_MOBILE_NUMBER),

  setProfileList: (profiles) =>
    localStorage.setItem(KEYS.PROFILE_LIST, JSON.stringify(profiles || [])),
  getProfileList: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.PROFILE_LIST) || "[]");
    } catch {
      return [];
    }
  },
  clearProfileList: () => localStorage.removeItem(KEYS.PROFILE_LIST),

  setSelectedProfile: (profile) =>
    localStorage.setItem(KEYS.SELECTED_PROFILE, JSON.stringify(profile || {})),
  getSelectedProfile: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.SELECTED_PROFILE) || "{}");
    } catch {
      return {};
    }
  },
  clearSelectedProfile: () => localStorage.removeItem(KEYS.SELECTED_PROFILE),

  clearAuthArtifacts: () => {
    localStorage.removeItem(KEYS.CODE_VERIFIER);
    localStorage.removeItem(KEYS.AUTH_STATE);
  },

  clearAllSession: () => {
    localStorage.removeItem(KEYS.TOKEN);
    localStorage.removeItem(KEYS.PROFILE_LIST);
    localStorage.removeItem(KEYS.SELECTED_PROFILE);
    localStorage.removeItem(KEYS.LOGIN_MOBILE_NUMBER);
    localStorage.removeItem(KEYS.CODE_VERIFIER);
    localStorage.removeItem(KEYS.AUTH_STATE);
  },
};