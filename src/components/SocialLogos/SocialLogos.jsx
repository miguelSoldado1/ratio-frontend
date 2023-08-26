import React from "react";
import { ReactComponent as TwitterLogo } from "../../icons/twitter-logo.svg";
import { ReactComponent as GitHubLogo } from "../../icons/github-logo.svg";
import { ReactComponent as PayPalLogo } from "../../icons/paypal-logo.svg";

export const SocialLogos = () => {
  return (
    <>
      <a href="https://github.com/miguelSoldado1" target="_blank" rel="noreferrer" title="GitHub" className="logo">
        <GitHubLogo />
      </a>
      <a href="https://twitter.com/ratiomusic_" target="_blank" rel="noreferrer" title="Twitter" className="logo">
        <TwitterLogo />
      </a>
      <a href="https://www.paypal.com/paypalme/ratiomusic" target="_blank" rel="noreferrer" title="Paypal <3" className="logo">
        <PayPalLogo />
      </a>
    </>
  );
};
