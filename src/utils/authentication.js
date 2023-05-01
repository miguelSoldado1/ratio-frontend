import axios from "axios";

const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  EXPIRES_IN: "expires_in",
  REDIRECT: "redirect",
};

const REFRESH_TOKEN_URL = `${process.env.REACT_APP_BACK_END_URL}/refresh`;

export const logout = () => {
  for (const key of Object.keys(LOCAL_STORAGE_KEYS)) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
  }

  window.location.href = "/";
};

const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refresh_token) {
      console.error("No refresh token available");
      logout();
    }

    const response = await axios.get(REFRESH_TOKEN_URL, { params: { refresh_token } });
    const { expires_in, access_token } = response.data;

    if (expires_in && access_token) {
      const expires_in_date = getExpiresIn(expires_in);
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, access_token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES_IN, expires_in_date);
      // axios.defaults.headers.common = { Authorization: `Bearer ${access_token}` };
    }
  } catch (error) {
    console.error(error);
  }
};

const hasTokenExpired = () => {
  const access_token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const expires_in = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRES_IN);
  if (!expires_in || !access_token) return false;

  const current = new Date().getTime();
  return current > Number(expires_in);
};

const getExpiresIn = (expiresIn) => {
  const current = new Date().getTime();
  const secondsBeforeRefresh = 59 * 60;
  return new Date(current + (Number(expiresIn) - secondsBeforeRefresh) * 1000).getTime();
};

export const getAccessToken = () => {
  const urlSearchParams = new URLSearchParams(window?.location?.search);
  const params_access_token = urlSearchParams.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const params_expires_in = urlSearchParams.get(LOCAL_STORAGE_KEYS.EXPIRES_IN);
  const params_refresh_token = urlSearchParams.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  const params_redirect = urlSearchParams.get(LOCAL_STORAGE_KEYS.REDIRECT);

  const storage_access_token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  if (hasTokenExpired() || storage_access_token === "undefined") {
    refreshToken();
  }

  if (storage_access_token && !storage_access_token !== "undefined") {
    axios.defaults.headers.common = { Authorization: `Bearer ${storage_access_token}` };
    return storage_access_token;
  }

  if (params_access_token && params_expires_in && params_refresh_token && params_redirect) {
    const expires_in_date = getExpiresIn(params_expires_in);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, params_access_token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, params_refresh_token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES_IN, expires_in_date);

    axios.defaults.headers.common = { Authorization: `Bearer ${params_access_token}` };
    if (params_redirect) window.location.href = params_redirect || "/";
  }

  return false;
};

export const accessToken = getAccessToken();
