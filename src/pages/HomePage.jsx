import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import getPokemonTitle from "../utils/getPokemonTitle";
import { navigateWithTitle } from "../utils/ChangeTitleBefore";
import { getPokemonDetails } from "../api/getPokemonDetails";
import { useSpeciesApi } from "../hooks/usePokeApi";
import { PokemonsFilter } from "../components/Inputs/filters/allFiltersExport";
import ScrollToTopButton from "../components/Inputs/ScrollToTopButton";
import ScrollToBotButton from "../components/Inputs/ScrollToBotButton";
import PokeballLoader from "../components/Loaders/PokeballLoader";
import CircleLoader from "../components/Loaders/CircleLoader";
import "./homePage.css";

const HomePage = () => {
  /* === Refs et navigation === */
  const contentRef = useRef(null);
  const navigate = useNavigate();

  /* === Donnees et filtres === */
  const [searchByName, setSearchByName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { data, isLoading, genStart, genEnd, setGenStart, setGenEnd } =
    useSpeciesApi();

  /* === Messages d'accessibilite pour le chargement === */
  const [statusMessage, setStatusMessage] = useState("");
  const LOADINGMESSAGE = "pokemon en chargement";
  const LOADEDMESSAGE = "chargement terminé";

  useEffect(() => {
    let delayTimeoutId;
    let reinsertTimeoutId;

    if (isLoading) {
      // Apres 1 seconde, annoncer le chargement avec re-insertion
      delayTimeoutId = setTimeout(() => {
        // Vider d'abord le message
        setStatusMessage("");
        // Puis reinjecter apres un court delai pour forcer la detection
        reinsertTimeoutId = setTimeout(() => {
          setStatusMessage(LOADINGMESSAGE);
        }, 100);
      }, 1000);
    } else if (data) {
      // Quand le chargement est termine, re-insertion rapide
      setStatusMessage("");
      reinsertTimeoutId = setTimeout(() => {
        setStatusMessage(LOADEDMESSAGE);
      }, 100);
    }

    return () => {
      if (delayTimeoutId) clearTimeout(delayTimeoutId);
      if (reinsertTimeoutId) clearTimeout(reinsertTimeoutId);
    };
  }, [isLoading, data]);

  /* === Preference de mouvement (reduce motion) === */
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('reduceMotion');
    return saved === 'true';
  });

  // Ecouter les changements de reduceMotion depuis les parametres
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('reduceMotion');
      setReduceMotion(saved === 'true');
    };

    // Synchronise reduceMotion si un autre onglet ou un composant met a jour le localStorage
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('reduceMotionChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reduceMotionChange', handleStorageChange);
    };
  }, []);

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
  };

  // Enregistre le choix de l'utilisateur concernant les animations
  useEffect(() => {
    localStorage.setItem('reduceMotion', reduceMotion);
  }, [reduceMotion]);

  /* === Loader d'image === */
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  /* === Navigation Pokemon avec titre precharge === */
  // Prefetch + titre + navigation, avec fallback en cas d'erreur
  const handlePokemonNavigation = async (event, pokemonId) => {
    event.preventDefault();

    try {
      const prefetch = await getPokemonDetails(pokemonId);
      navigateWithTitle({
        navigate,
        to: `/pokemon/${pokemonId}`,
        title: getPokemonTitle(pokemonId, prefetch),
        state: { prefetch },
      });
    } catch (error) {
      navigateWithTitle({
        navigate,
        to: `/pokemon/${pokemonId}`,
        title: getPokemonTitle(pokemonId),
      });
    }
  };

  
  return (
    <div className="homePage">
      <Helmet>
        <title aria-live="polite">Accueil - Pokedex</title>
      </Helmet>

      {/* Gestion des contenus en mouvement */}
      <div ref={contentRef} className="homePageContainer">
        <div role="heading" aria-level="1" className="srOnly skipTarget" tabIndex="-1">Liste des Pokémon</div>

        <PokemonsFilter
          genStart={genStart}
          genEnd={genEnd}
          setGenStart={setGenStart}
          setGenEnd={setGenEnd}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          searchByName={searchByName}
          setSearchByName={setSearchByName}
        />

        {/* Loader ou erreur */}
        {isLoading && (
          reduceMotion ? (
            <div className="statusMessage" role="status" aria-live="polite">
              <p>Chargement</p>
            </div>
          ) : (
            <PokeballLoader />
          )
        )}

        {/* Message status pour l'accessibilité */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="srOnly"
        >
          {statusMessage}
        </div>

        {/* Liste des pokemons filtrés */}
        {data && (
          <nav aria-label="Affichage sur pokedex">
            <ul
              className="pokemonGrid"
              id="listContainer">
              {data
                .filter(
                  ({ name, types }) =>
                    name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .includes(
                        searchByName
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, ""),
                      ) &&
                    (selectedTypes.length > 0
                      ? types.some((t) => selectedTypes.includes(t))
                      : true),
                )
                .map(({ id, name, types, sprite }, index) => (
                  <li
                    className={`${types[0]} pokemonCard`}
                    key={index}
                  >
                    <Link
                      to={`/pokemon/${id}`}
                      aria-label={`${name} pokemon numéro ${id}`}
                      onClick={(event) => handlePokemonNavigation(event, id)}
                    >
                      <div className="pokemonCardHeader">
                        <p>{name}</p>
                        <p>N°{id}</p>
                      </div>

                      <div className="pokemonCardImageContainer">
                        {imageLoading &&
                          (reduceMotion ? (
                            <div className="statusMessage" role="status"></div>
                          ) : (
                            <CircleLoader />
                          ))}
                        <img
                          src={sprite}
                          alt={name}
                          onLoad={handleImageLoaded}
                          className="pokemonCardImage"
                          style={{ display: imageLoading ? 'none' : 'block' }}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        )}

        <ScrollToTopButton/>
        <ScrollToBotButton/>
      </div>
    </div>
  );
};

export default HomePage;
