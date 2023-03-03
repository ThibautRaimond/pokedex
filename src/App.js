import React, { useState } from "react";
import Router from "./components/Router";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<div className={isDarkMode ? "dark-mode" : "light-mode"}>
			<Router />
		</div>
	);
}

export default App;
