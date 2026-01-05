import "./toggleTheme.css";

const ToggleTheme = ({ onChange, state, icons }) => {
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onChange();
		}
	};

	const ariaText = state === "dark" ? "Activé le thème clair" : "Activé le thème sombre";

	return (
		<div className="toggleContainer">
			<div
				id="toggle-switch"
				className={`darkModeInput ${state === "dark" ? "inputChecked" : ""}`}
				checked={state === "dark"}
				readOnly
			/>
			<div
				className="toggleLabel"
				tabIndex="0"
				role="button"
				onClick={onChange}
				onKeyDown={handleKeyDown}
			>
				<span className="toggleThumb"></span>
				{state === "dark" && (
					<span className="leftIcon" aria-hidden="true">
						<span role="img" className="leftIcon" alt="">
							{icons[0] || ""}
						</span>
					</span>
				)}
				{state === "light" && (
					<span className="rightIcon" aria-hidden="true">
						<span role="img" className="rightIcon" alt="">
							{icons[1] || ""}
						</span>
					</span>
				)}
			</div>
			{/* élément invisible pour vocaliser le changement */}
			<div
				aria-live="polite"
				style={{
					position: "absolute",
					width: 0,
					height: 0,
					overflow: "hidden",
				}}
			>
				{ariaText}
			</div>
		</div>
	);
};

export default ToggleTheme;