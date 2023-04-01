import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "./Footer.css"

const Footer = () => {
	return (
		<div className="footerContainer">

			<Link to={`https://thibautraimond.github.io/portfolio/`} target="_blank">
				<p className="footerContainer__Portfolio">Plus de projet sur ici sur mon portfolio</p>
			</Link>

			<p className="footerContainer__copyright">Free copyright</p>

			<div className="footerContainer__socialMedia">
				<Link to={`https://github.com/ThibautRaimond`} target="_blank">
					<AiFillGithub size={30} className="socialMedia__Github"/>
				</Link>
				<Link to={`https://www.linkedin.com/in/thibaut-raimond-0a46791ab/`} target="_blank">
					<AiFillLinkedin size={30} className="socialMedia__Linkedin"/>
				</Link>
			</div>

		</div>
	);
};

export default Footer;
