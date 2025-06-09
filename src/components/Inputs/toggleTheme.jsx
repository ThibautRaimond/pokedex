import "./toggleTheme.css";

const ToggleTheme = ({ onChange, state, icons }) => {
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault(); // empêche le scroll avec espace
			onChange(); // déclenche le changement de thème
		}
	};

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
					<span className="leftIcon" aria-label="Activé le thème clair">
						<span role="img" className="leftIcon" alt="">
							{icons[0] ? icons[0] : ""}
						</span>
					</span>
				)}
				{state === "light" && (
					<span className="rightIcon" aria-label="Activé le thème sombre">
						<span role="img" className="rightIcon" alt="">
							{icons[1] ? icons[1] : ""}
						</span>
					</span>
				)}
			</div>
		</div>
	);
};

export default ToggleTheme;
