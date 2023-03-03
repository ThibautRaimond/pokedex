import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import indexCss from "./styles/index.css";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Ajouter une classe à l'élément racine en fonction de l'URL chargée
if (window.location.pathname.includes("/pokedex/pokemon")) {
	document.documentElement.classList.add("htmlPokedex");
}

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
