import React from "react";
import LogoPokemon from "../assets/pokemon.png";

const Navbar = () => {
	return (
		<div>
			<img src={LogoPokemon} alt="Logo Pokemon" style={{ width: "75px" }} />
		</div>
	);
};

export default Navbar;
