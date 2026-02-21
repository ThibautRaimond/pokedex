import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { RxOpenInNewWindow } from "react-icons/rx";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" tabIndex="-1">
      <nav aria-label="Liens professionnels">
        <ul className="footerContainer">
          <div className="footerContainerSocialsMedias">
            <li>
              <Link to={`https://github.com/ThibautRaimond`} target="_blank" className="socialMediaLink">
                <span className="srOnly">
                  Github de Thibaut Raimond onglet externe
                </span>
                <AiFillGithub
                  size={45}
                  className="socialsMediasSocialMedia socialsMediasGithub"
                  aria-hidden="true"
                />
                <RxOpenInNewWindow className="externalLinkIcon" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                to={`https://www.linkedin.com/in/thibaut-raimond-0a46791ab/`}
                target="_blank"
                className="socialMediaLink"
              >
                <span className="srOnly">
                  Github de Thibaut Raimond onglet externe
                </span>
                <AiFillLinkedin
                  size={45}
                  className="socialsMediasSocialMedia socialsMediasLinkedin"
                  aria-hidden="true"
                />
                <RxOpenInNewWindow className="externalLinkIcon" aria-hidden="true" />
              </Link>
            </li>
          </div>
          <li>
            <Link
              to={`https://thibautraimond.github.io/portfolio/`}
              target="_blank"
            >
              <p className="footerContainerPortfolio">
                Visiter mon portfolio{" "}
                <RxOpenInNewWindow aria-hidden="true" />
                <span className="srOnly">Onglet externe</span>
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
