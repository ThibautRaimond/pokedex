import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import "./toggleMenu.css";

const ToggleMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="menuIconContainer" onClick={handleMenuClick}>
			{isMenuOpen ? (
				<IoMdCloseCircleOutline className="closeIcon menuIcon" />
			) : (
				<GiHamburgerMenu className="hamburgerIcon menuIcon" />
			)}
		</div>
	);
};

export default ToggleMenu;
