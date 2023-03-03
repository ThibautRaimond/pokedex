import React, { useState } from "react";
import "../styles/components/modeToggle.css";

const ModeToggle = ({ onToggle }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleToggle = () => {
		setIsDarkMode(!isDarkMode);
		onToggle();
	};

	return (
		<div className="toggle">
			<input
				type="checkbox"
				id="toggle-switch"
				className="darkModeInput"
				onChange={handleToggle}
			/>
			<label htmlFor="toggle-switch" className="">
				{isDarkMode ? (
					<span className="moon">
						<span role="img" aria-label="moon" className="moon">
							🌙
						</span>
					</span>
				) : (
					<span className="sun">
						<span role="img" aria-label="sun" className="sun">
							☀️
						</span>
					</span>
				)}
			</label>
		</div>
	);
};

export default ModeToggle;
