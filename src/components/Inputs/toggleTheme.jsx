import "./toggleTheme.css";

const toggleTheme = ({ onChange, state, icons }) => {
	return (
		<div className="toggle">
			<input
				type="checkbox"
				id="toggle-switch"
				className="darkModeInput"
				onChange={onChange}
			/>
			<label htmlFor="toggle-switch">
				{state === "dark" && (
					<span className="left"  alt="changer le thème en mode blanc">
						<span role="img" alt="" className="left">
							{icons[0] ? icons[0] : ""}
						</span>
					</span>
				)}
				{state === "light" && (
					<span className="right">
						<span role="img" className="right" alt="">
							{icons[1] ? icons[1] : ""}
						</span>
					</span>
				)}
			</label>
		</div>
	);
};

export default toggleTheme;
