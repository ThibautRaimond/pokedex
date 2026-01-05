import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "./Footer.css"

const Footer = () => {
	return (
		<div className="footerContainer">
			<div className="footerContainer__socialsMediasContainer">
				<Link to={`https://github.com/ThibautRaimond`} target="_blank" aria-label="Github de Thibaut Raimond">
					<AiFillGithub size={45} className="socialsMediasContainer__SocialMedia socialsMediasContainer__Github" aria-hidden="true"/>
				</Link>
				<Link to={`https://www.linkedin.com/in/thibaut-raimond-0a46791ab/`} target="_blank" aria-label="Linkedin de Thibaut Raimond">
					<AiFillLinkedin size={45} className="socialsMediasContainer__SocialMedia socialsMediasContainer__Linkedin" aria-hidden="true"/>
				</Link>
			</div>

			<Link to={`https://thibautraimond.github.io/portfolio/`} target="_blank">
				<p className="footerContainer__Portfolio">Visiter mon portfolio</p>
			</Link>
		</div>
	);
};

export default Footer;
