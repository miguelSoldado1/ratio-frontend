import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const ACCESS_TOKEN_COOKIE_NAME = "access_token";

const useAccessToken = () => {
  const [cookies, setCookies, removeCookie] = useCookies([ACCESS_TOKEN_COOKIE_NAME]);
  const navigate = useNavigate();

  const accessToken = cookies.access_token;

  const setAccessToken = () => {
    const urlSearchParams = new URLSearchParams(window?.location?.search);
    const access_token = urlSearchParams.get(ACCESS_TOKEN_COOKIE_NAME);
    const expires_in = urlSearchParams.get("expires_in");
    const redirect = urlSearchParams.get("redirect");
    if (access_token && expires_in) {
      setCookies(ACCESS_TOKEN_COOKIE_NAME, access_token, { maxAge: expires_in });
      navigate(redirect || "/");
    }
  };

  const removeAccessToken = () => {
    removeCookie(ACCESS_TOKEN_COOKIE_NAME, { path: "/" });
    navigate("/");
  };

  return [accessToken, removeAccessToken, setAccessToken];
};

export default useAccessToken;
