import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import { Button, SocialLogos } from "../../components";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./LandingPage.css";

const LOGIN_URL = `${process.env.REACT_APP_BACK_END_URL}/login?pathname=${window.location.pathname}`;
const HEADER_TEXT = "Welcome to Ratio!";

export const LandingPage = () => {
  return (
    <div className="landing-page-outer">
      <div className="login-container">
        <RatioLogo />
        <h1 className="login-header-text">{HEADER_TEXT}</h1>
        <span className="login-content-text">
          Rate your favourite albums <br /> and discover new ones!
        </span>
        <Button>
          <a className="login-button" href={LOGIN_URL}>
            Login to Spotify
            <img className="spotify-logo" src={spotifyLogo} alt="spotify" />
          </a>
        </Button>
        <div className="login-footer">
          <SocialLogos />
        </div>
        <span className="login-copyright">Copyright &copy; Ratio {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};
