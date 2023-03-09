import "./Toggle.css";

const Toggle = ({ onChange, state, icons }) => {
	return (
		<div className="toggle">
			<input
				type="checkbox"
				id="toggle-switch"
				className="darkModeInput"
				onChange={onChange}
			/>
			<label htmlFor="toggle-switch" className="">
				{state === "dark" && (
					<span className="left">
						<span role="img" aria-label="left" className="left">
							{icons[0] ? icons[0] : ""}
						</span>
					</span>
				)}
				{state === "light" && (
					<span className="right">
						<span role="img" aria-label="right" className="right">
							{icons[1] ? icons[1] : ""}
						</span>
					</span>
				)}
			</label>
		</div>
	);
};

export default Toggle;

//
