import { useNavigate } from "react-router";
import axios from "axios";

const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  EXPIRES_IN: "expires_in",
  REDIRECT: "redirect",
};

const REFRESH_TOKEN_URL = `${process.env.REACT_APP_BACK_END_URL}/auth/refresh`;
const SECONDS_BEFORE_REFRESH_TOKEN = 60;

const clearAuthStorage = () => {
  for (const key of Object.keys(LOCAL_STORAGE_KEYS)) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
  }
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      clearAuthStorage();
      throw Error("No refresh token available");
    }

    const response = await axios.get(REFRESH_TOKEN_URL, { params: { refresh_token: refreshToken } });
    const { expires_in: expiresIn, access_token: accessToken } = response.data;

    if (expiresIn && accessToken) {
      const expiresInDate = getExpiresIn(expiresIn);
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES_IN, expiresInDate);
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const hasTokenExpired = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const expiresIn = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRES_IN);
  if (!expiresIn || !accessToken) return false;

  return new Date().getTime() > Number(expiresIn);
};

const getExpiresIn = (expiresIn) => {
  const current = new Date().getTime();
  return new Date(current + (Number(expiresIn) - SECONDS_BEFORE_REFRESH_TOKEN) * 1000).getTime();
};

const useAccessToken = () => {
  const navigate = useNavigate();

  const getAccessToken = async () => {
    const urlSearchParams = new URLSearchParams(window?.location?.search);
    const paramsAccessToken = urlSearchParams.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const paramsExpiresIn = urlSearchParams.get(LOCAL_STORAGE_KEYS.EXPIRES_IN);
    const paramsRefreshToken = urlSearchParams.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    const paramsRedirect = urlSearchParams.get(LOCAL_STORAGE_KEYS.REDIRECT);

    let accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (hasTokenExpired() || accessToken === "undefined") {
      accessToken = await refreshAccessToken();
    }

    if (accessToken) {
      axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
    }

    if (paramsAccessToken && paramsExpiresIn && paramsRefreshToken && paramsRedirect) {
      const expires_in_date = getExpiresIn(paramsExpiresIn);
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, paramsAccessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, paramsRefreshToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES_IN, expires_in_date);
      axios.defaults.headers.common = { Authorization: `Bearer ${paramsAccessToken}` };
      navigate(paramsRedirect || "/");
    }
  };

  const removeAccessToken = () => {
    clearAuthStorage();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return { accessToken: localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN), getAccessToken, removeAccessToken };
};

export default useAccessToken;
