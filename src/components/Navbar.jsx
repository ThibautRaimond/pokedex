import React from "react";
import { Link } from "react-router-dom";

import "../styles/components/navbar.css";
import LogoPokemon from "../assets/pokemon.png";

const Navbar = () => {
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

			<Link
				to="https://thibautraimond.github.io/portfolio/"
				target="_blank"
				className="navbar__porfolioLinkContainer"
			>
				<h2 className="navbar__porfolioLink">Mon Porfolio</h2>
			</Link>
		</nav>
	);
};

export default Navbar;
