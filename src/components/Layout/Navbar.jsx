import { Link, useLocation } from "react-router-dom";

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
    <header>
      <nav className="navbar" aria-label="menu principal">
        <Link to="/pokedex" onClick={handleHomeClick}>
          <img
            className="Accueil"
            src={LogoPokemon}
            alt="Accueil"
            style={{ width: "75px" }}
          />
        </Link>
        <h1 className="navbar__title">POKEDEX</h1>
        <ThemeToggler
          onChange={toggleTheme}
          state={theme}
          icons={["🌙", "☀️"]}
        />
      </nav>
    </header>
  );
};

export default Navbar;
