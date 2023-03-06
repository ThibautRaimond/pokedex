import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModeToggle from "./ModeToggle";

import "../styles/components/navbar.css";
import LogoPokemon from "../assets/pokemon.png";

const Navbar = () => {
	const [darkMode, setDarkMode] = useState(false);

	const handleToggle = () => {
		setDarkMode(!darkMode);
		document.body.classList.toggle("darkMode");
	};

	return (
			<nav className="navbar">
				<Link to="/pokedex" className="navbar__logoPokemonContainer">
					<img
						className="logoPokemon"
						src={LogoPokemon}
						alt="Logo Pokemon"
						style={{ width: "75px" }}
					/>
				</Link>

				<h1 className="navbar__title">POKEDEX</h1>

				<ModeToggle onToggle={handleToggle} />
			</nav>
	);
};

export default Navbar;
