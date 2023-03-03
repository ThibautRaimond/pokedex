import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Pokedex from "../pages/Pokedex";

const Routeur = () => {
	const location = useLocation();
	return (
		<Routes location={location.pathname} key={location.pathname}>
			<Route path="/pokedex" element={<HomePage />} />
			<Route path="/pokedex/pokemon/:id" element={<Pokedex />} />
		</Routes>
	);
};

export default Routeur;
