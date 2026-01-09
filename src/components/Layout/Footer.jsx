import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "./Footer.css";

const Footer = () => {
  return (
    <nav aria-label="Liens professionnels">
      <ul className="footerContainer">
        <div className="footerContainer__socialsMediasContainer">
          <li>
            <Link
              to={`https://github.com/ThibautRaimond`}
              target="_blank"
            >
              <span className="sr-only">Github de Thibaut Raimond onglet externe</span>
              <AiFillGithub
                size={45}
                className="socialsMediasContainer__SocialMedia socialsMediasContainer__Github"
                aria-hidden="true"
              />
            </Link>
          </li>
          <li>
            <Link
              to={`https://www.linkedin.com/in/thibaut-raimond-0a46791ab/`}
              target="_blank"
            >
            <span className="sr-only">Github de Thibaut Raimond onglet externe</span>
              <AiFillLinkedin
                size={45}
                className="socialsMediasContainer__SocialMedia socialsMediasContainer__Linkedin"
                aria-hidden="true"
              />
            </Link>
          </li>
        </div>
        <li>
          <Link
            to={`https://thibautraimond.github.io/portfolio/`}
            target="_blank"
          >
            <p className="footerContainer__Portfolio">Visiter mon portfolio <span className="sr-only">Onglet externe</span></p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
