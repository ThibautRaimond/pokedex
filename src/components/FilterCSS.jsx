import React from "react";

const loadedCSSFiles = {};

function FilterCSS({ cssFile, children }) {
	// Vérifie si le fichier CSS a déjà été chargé
	if (!loadedCSSFiles[cssFile]) {
		// Si le fichier CSS n'a pas été chargé, créez un élément link pour charger le fichier CSS
		const link = document.createElement("link");
		link.href = cssFile;
		link.rel = "stylesheet";
		link.type = "text/css";
		document.head.appendChild(link);
		loadedCSSFiles[cssFile] = true;
	}

	// Rendu des enfants avec le style CSS appliqué
	return <div className="filter-css">{children}</div>;
}

export default FilterCSS;
