import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggler from "../Inputs/Toggle";

import "./Navbar.css";
import LogoPokemon from "../../assets/pokemon.png";

const Navbar = () => {
	const { theme, toggleTheme } = useTheme();

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

			<ThemeToggler onChange={toggleTheme} state={theme} icons={["🌙", "☀️"]} />
		</nav>
	);
};

export default Navbar;
