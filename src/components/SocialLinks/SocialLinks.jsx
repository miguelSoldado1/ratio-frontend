import React from "react";
import { ReactComponent as Github } from "../../icons/github-logo.svg";
import { ReactComponent as LinkedIn } from "../../icons/linkedin-logo.svg";
import { ReactComponent as Instagram } from "../../icons/instagram-logo.svg";
import { ReactComponent as Twitter } from "../../icons/twitter-logo.svg";

import "./SocialLinks.css";

export const SocialLinks = () => {
  return (
    <div className="social-components">
      <a href="https://github.com/miguelSoldado1" target="_blank" rel="noreferrer">
        <Github className="social-components-logo" />
      </a>
      <a href="https://www.linkedin.com/in/miguel-soldado-0221891b5/" target="_blank" rel="noreferrer">
        <LinkedIn className="social-components-logo" />
      </a>
      <a href="https://www.instagram.com/miguel.soldado/" target="_blank" rel="noreferrer">
        <Instagram className="social-components-logo" />
      </a>
      <a href="https://twitter.com/_MiguelSoldado_" target="_blank" rel="noreferrer">
        <Twitter className="social-components-logo" />
      </a>
    </div>
  );
};
