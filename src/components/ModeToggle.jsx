import React from "react";

const ModeToggle = ({ onToggle }) => {
	const handleToggle = () => {
		onToggle();
	};

	return (
		<div className="toggle">
			<input type="checkbox" id="toggle-switch" onChange={handleToggle} />
			<label htmlFor="toggle-switch">Toggle</label>
		</div>
	);
};

export default ModeToggle;
