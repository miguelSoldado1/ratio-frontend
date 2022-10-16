import React from "react";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./LandingPage.css";

const LOGIN_URL = `${process.env.REACT_APP_BACK_END_URL}/login?pathname=${window.location.pathname}`;
const HEADER_TEXT = "Welcome to Ratio!";
const GET_STARTED_TEXT = "Get started by logging into your Spotify account!";

export const LandingPage = () => {
  return (
    <div className="landing-page-outer">
      <div className="landing-page-inner">
        <div className="landing-page-header">
          <RatioLogo />
          <h1>{HEADER_TEXT}</h1>
        </div>
        <span className="landing-page-text">{GET_STARTED_TEXT}</span>
        <a className="custom-button landing" href={LOGIN_URL}>
          Log in to Spotify <img src={spotifyLogo} alt="spotify" style={{ width: ".8em", height: ".8em" }} />
        </a>
        <div className="landing-page-footer">
          <a href="https://github.com/miguelSoldado1" target="_blank" rel="noreferrer">
            GitHub
          </a>
          |
          <a href="" target="_blank" rel="noreferrer">
            Paypal
          </a>
          |
          <a href="" target="_blank" rel="noreferrer">
            Contact us
          </a>
        </div>
        <span>Copyright &copy; Ratio 2022</span>
      </div>
    </div>
  );
};
