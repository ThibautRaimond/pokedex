import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { FaGear } from "react-icons/fa6";
import { IoAccessibility } from "react-icons/io5";

import SettingsA11Y from "./SettingsA11Y";
import LogoPokemon from "../../assets/pokemon.png";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isOnHomexPage = location.pathname === "/";
  const settingsDialogRef = useRef(null);

  const handleHomeClick = () => {
    if (isOnHomexPage) {
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
        {isOnHomexPage ? (
          <img
            className="Accueil"
            src={LogoPokemon}
            alt=""
            style={{ width: "75px" }}
            aria-hidden="true"
          />
        ) : (
          <Link to="/" onClick={handleHomeClick} aria-label="Retourner à l'accueil">
            <img
              className="Accueil"
              src={LogoPokemon}
              alt="Retourner à l'accueil"
              style={{ width: "75px" }}
              aria-hidden="true"
            />
          </Link>
        )}
        <p className="headerTitle">POKEDEX</p>
        <button 
          className="settingsButton" 
          aria-label="Ouvrir paramètres et accessibilité"
          aria-haspopup="dialog"
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
