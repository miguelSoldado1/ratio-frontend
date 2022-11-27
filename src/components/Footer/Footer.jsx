import { SocialLogos } from "../SocialLogos/SocialLogos";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">Copyright &copy; Ratio 2022</div>
      <div className="footer-plugs">
        <SocialLogos />
      </div>
    </footer>
  );
};
