import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PokedexPage from "../pages/PokedexPage";
import NotFoundPage from "../pages/NotFoundPage";

const PokemonRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/pokemon/${id}`} replace />;
};

const Routeur = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/pokemon/")) {
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
      <Route path="/pokedex" element={<Navigate to="/" replace />} />
      <Route path="/pokedex/pokemon/:id" element={<PokemonRedirect />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:id" element={<PokedexPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routeur;
