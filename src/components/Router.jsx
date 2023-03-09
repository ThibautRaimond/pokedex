import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PokedexPage from "../pages/PokedexPage";

const Routeur = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.startsWith("/pokedex/pokemon/")) {
			document.body.classList.add("pokedexBody");
		} else {
			document.body.classList.remove("pokedexBody");
		}

		return () => {
			document.body.classList.remove("pokedexBody");
		};
	}, [location.pathname]);

	return (
		<Routes location={location.pathname} key={location.pathname}>
			<Route path="/pokedex" element={<HomePage />} />
			<Route path="/pokedex/pokemon/:id" element={<PokedexPage />} />
		</Routes>
	);
};

export default Routeur;
