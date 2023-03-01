import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "../pages/HomePage";
import Pokedex from "../pages/Pokedex";

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence>
			<Routes location={location.pathname} key={location.pathname}>
				<Route path="/pokedex" element={<HomePage />} />
				<Route path="/pokedex/pokemon/:id" element={<Pokedex />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
