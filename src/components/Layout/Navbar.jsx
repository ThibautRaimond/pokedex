import { Link, useLocation } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggler from "../Inputs/toggleTheme";
import LogoPokemon from "../../assets/pokemon.png";
import "./Navbar.css";

const Navbar = () => {
	const { theme, toggleTheme } = useTheme();
	const location = useLocation();
	const isOnPokedexPage = location.pathname === "/pokedex";

	const handleHomeClick = () => {
		if (isOnPokedexPage) {
			window.location.reload();
		}
	};

	return (
		<nav className="navbar">
			<Link to="/pokedex" onClick={handleHomeClick}>
			<img
						className="logoPokemon"
						src={LogoPokemon}
						alt="Logo Accueil"
						style={{ width: "75px" }}
					/>
			</Link>
			<h1 className="navbar__title">POKEDEX</h1>
			<ThemeToggler onChange={toggleTheme} state={theme} icons={["🌙", "☀️"]} />
		</nav>
	);
};

export default Navbar;
