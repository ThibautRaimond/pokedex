import React, { useState, useEffect } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "./ScrollButtons.css";

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<div
			className={`scrollButton scrollToTopButton ${isVisible ? "visible" : ""}`}
			onClick={scrollToTop}
		>
			<BsFillArrowUpCircleFill size={30} alt="Remonter en haut de la page"/>
		</div>
	);
};

export default ScrollToTopButton;
