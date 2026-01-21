import { Link, useLocation } from "react-router-dom";

import { useTheme } from "../../hooks/useTheme";
import ThemeToggler from "../Inputs/toggleTheme";
import LogoPokemon from "../../assets/pokemon.png";
import "./Header.css";

const Header = () => {
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
      <div className="header">
        <Link to="/pokedex" onClick={handleHomeClick}>
          <img
            className="Accueil"
            src={LogoPokemon}
            alt="Accueil"
            style={{ width: "75px" }}
          />
        </Link>
        <p className="header__title">POKEDEX</p>
        <ThemeToggler
          onChange={toggleTheme}
          state={theme}
          icons={["🌙", "☀️"]}
        />
      </div>
      {/* Ancre de saut vers le contenu principal */}
      <div
        id="content-anchor"
        tabIndex="-1"
      />
    </header>
  );
};

export default Header;
