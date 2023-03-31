import { Link, useLocation } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";

import { useTheme } from "../../hooks/useTheme";
import ThemeToggler from "../Inputs/toggleTheme";
import "./Navbar.css";

const Navbar = () => {
	const { theme, toggleTheme } = useTheme();
	const location = useLocation();

	return (
		<nav className="navbar">
			<Link
				to="/pokedex"
				onClick={() => {
					if (location.pathname === "/pokedex") window.location.reload();
				}}
			>
				<AiTwotoneHome className="closeIcon menuIcon" alt="Bouton Accueil"/>
			</Link>
			<h1 className="navbar__title">POKEDEX</h1>
			<ThemeToggler onChange={toggleTheme} state={theme} icons={["🌙", "☀️"]} />
		</nav>
	);
};

export default Navbar;
