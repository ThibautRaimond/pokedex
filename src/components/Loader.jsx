import React from "react";
import "../styles/components/loader.css";

function Loader() {
	return (
		<div className="loader">
			<p className="loaderText">Chargement des pokemons</p>
			<div className="lds-spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Loader;
