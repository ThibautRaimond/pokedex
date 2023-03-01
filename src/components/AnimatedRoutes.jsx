import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "../pages/HomePage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence>
			<Routes location={location.pathname} key={location.pathname}>
				<Route path="/pokedex" element={<HomePage />} />
				<Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
