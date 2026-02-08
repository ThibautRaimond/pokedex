import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PokedexPage from "../pages/PokedexPage";

const Routeur = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/pokedex/pokemon/")) {
      document.body.classList.add("pokedexBody");
    } else {
      document.body.classList.remove("pokedexBody");
    }

    // Forcer la réinitialisation du focus comme une vraie navigation
    // Retirer le focus de tout élément actif
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    
    // Remettre le tabindex sur -1 pour que le body ne soit pas tabulable
    // mais puisse recevoir le focus programmatiquement
    document.body.setAttribute('tabindex', '-1');
    document.body.focus();
    
    // Petit délai pour s'assurer que le DOM est à jour
    setTimeout(() => {
      document.body.blur();
      document.body.removeAttribute('tabindex');
    }, 0);
    
    return () => {
      document.body.classList.remove("pokedexBody");
    };
  }, [location.pathname]);

  return (
    <Routes location={location.pathname}>
      <Route path="/pokedex" element={<HomePage />} />
      <Route path="/pokedex/pokemon/:id" element={<PokedexPage />} />
    </Routes>
  );
};

export default Routeur;
