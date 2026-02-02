import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { FaGear } from "react-icons/fa6";
import { IoAccessibility } from "react-icons/io5";

import SettingsA11Y from "./SettingsA11Y";
import LogoPokemon from "../../assets/pokemon.png";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const isOnPokedexPage = location.pathname === "/pokedex";
  const settingsDialogRef = useRef(null);

  const handleHomeClick = () => {
    if (isOnPokedexPage) {
      window.location.reload();
    }
  };

  const openSettings = () => {
    if (settingsDialogRef.current) {
      settingsDialogRef.current.showModal();
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
        <p className="headerTitle">POKEDEX</p>
        <button 
          className="settingsButton" 
          aria-label="Ouvrir paramètres et accessibilité"
          onClick={openSettings}
        >
          <FaGear aria-hidden="true" />
          <IoAccessibility aria-hidden="true" />
        </button>
      </div>
      <SettingsA11Y ref={settingsDialogRef} />
    </header>
  );
};

export default Header;
