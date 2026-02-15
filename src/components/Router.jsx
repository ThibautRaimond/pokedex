import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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

    // Forcer le focus sur l'annonce du titre de page pour les lecteurs d'écran
    // Petit délai pour s'assurer que le DOM et le titre sont à jour
    setTimeout(() => {
      const pageTitleElement = document.getElementById("page-title-announce");
      if (pageTitleElement) {
        pageTitleElement.focus();
      }
    }, 100);

    return () => {
      document.body.classList.remove("pokedexBody");
    };
  }, [location.pathname]);

  return (
    <Routes location={location.pathname}>
      <Route path="/" element={<Navigate to="/pokedex" replace />} />
      <Route path="/pokedex" element={<HomePage />} />
      <Route path="/pokedex/pokemon/:id" element={<PokedexPage />} />
    </Routes>
  );
};

export default Routeur;
