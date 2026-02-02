import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Helmet } from "react-helmet";

import { useSpeciesApi } from "../hooks/usePokeApi";
import { translateType } from "../locales/types";

import ScrollToTopButton from "../components/Inputs/scrollToTopButton";
import ScrollToBotButton from "../components/Inputs/scrollToBotButton";
import PokeballLoader from "../components/Loaders/pokeballLoader";
import CircleLoader from "../components/Loaders/circleLoader";
import "./homePage.css";

const HomePage = () => {
  /* === Gestion API pokemon === */
  const contentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const { data, isLoading, genStart, genEnd, setGenStart, setGenEnd } =
    useSpeciesApi();

  /* === Messages d'accessibilité pour le chargement === */
  const [statusMessage, setStatusMessage] = useState("");

  const LOADINGMESSAGE = "pokemon en chargement";
  const LOADEDMESSAGE = "chargement terminé";

  useEffect(() => {
    let delayTimeoutId;
    let reinsertTimeoutId;

    if (isLoading) {
      // Après 1 seconde, annoncer le chargement avec ré-insertion
      delayTimeoutId = setTimeout(() => {
        // Vider d'abord le message
        setStatusMessage("");
        // Puis réinjecter après un court délai pour forcer la détection
        reinsertTimeoutId = setTimeout(() => {
          setStatusMessage(LOADINGMESSAGE);
        }, 100);
      }, 1000);
    } else if (data) {
      // Quand le chargement est terminé, ré-insertion rapide
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

  /* === Vocalisation du potentiomètre */
  const genLabel = (gen) => {
    switch (gen) {
      case 1:
        return "première génération";
      case 2:
        return "deuxième génération";
      case 3:
        return "troisième génération";
      case 4:
        return "quatrième génération";
      case 5:
        return "cinquième génération";
      case 6:
        return "sixième génération";
      case 7:
        return "septième génération";
      case 8:
        return "huitième génération";
      case 9:
        return "neuvième génération";
      default:
        return `${gen}ᵉ génération`;
    }
  };

  /* === Accordéon === */
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  /* === Gestion des contenus en mouvement === */
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('reduceMotion');
    return saved === 'true';
  });

  // Écouter les changements de reduceMotion depuis les paramètres
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('reduceMotion');
      setReduceMotion(saved === 'true');
    };

    // Écouter les changements via un événement personnalisé
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

  useEffect(() => {
    localStorage.setItem('reduceMotion', reduceMotion);
  }, [reduceMotion]);

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  // Fonction pour déterminer tabIndex selon isOpen
  const getTabIndex = () => (isOpen ? 0 : -1);

  
  return (
    <div className="homePage">
      <Helmet>
        <title>Accueil - Pokedex</title>
      </Helmet>

      {/* Gestion des contenus en mouvement */}
      <div ref={contentRef} className="homePageContainer">
        <div role="heading" aria-level="1" className="srOnly skipTarget" tabIndex="-1">Liste des Pokémon</div>

        {/* Bouton menu des filtres */}
        <button
          className="filterSectionToggleButton"
          onClick={toggleDiv}
          aria-expanded={isOpen}
          aria-controls="filterPokemonContainer"
          type="button"
        >
          {isOpen ? (
            <RxCross2 className="filterSectionToggleIcon" size={25} />
          ) : (
            <RxHamburgerMenu className="filterSectionToggleIcon" size={25} />
          )}
          <span className="filterSectionToggleLabel">
            <p className="filterSectionToggleTitle">
              Filtrer les pokemons
            </p>
          </span>
        </button>

        <ul
          className={`filterSectionContainer ${isOpen ? "isOpen" : ""}`}
          id="filterPokemonContainer"
          aria-hidden={!isOpen}
          aria-label="3 options de filtres"
        >
          <li className="generationFilterContainer">
            <fieldset className="generationFilter">
              <legend
                id="generationGroupLabel"
                className="generationFilterLegend"
              >
                Filtrer par Générations
              </legend>

              <div className="generationFilterRangeContainer" role="group">
                {/* Slider début */}
                <label
                  id="genStartLabel"
                  htmlFor="gen-start"
                  className="srOnly"
                >
                  Choisir la génération de départ
                </label>

                <input
                  id="genStart"
                  type="range"
                  min="1"
                  max="9"
                  value={genStart}
                  onChange={(e) =>
                    setGenStart(Math.min(Number(e.target.value), genEnd))
                  }
                  className="generationFilterRangeThumb generationFilterRangeThumbStart"
                  aria-labelledby="genStartLabel"
                  aria-valuemin={1}
                  aria-valuemax={9}
                  aria-valuenow={genStart}
                  aria-valuetext={genLabel(genStart)}
                  tabIndex={getTabIndex()}
                  disabled={genStart === 1 && genEnd === 1}
                />

                {/* Slider fin */}
                <label id="genEndLabel" htmlFor="genEnd" className="srOnly">
                  Choisir la génération limite
                </label>

                <input
                  id="genEnd"
                  type="range"
                  min="1"
                  max="9"
                  value={genEnd}
                  onChange={(e) =>
                    setGenEnd(Math.max(Number(e.target.value), genStart))
                  }
                  className="generationFilterRangeThumb generationFilterRangeThumbEnd"
                  aria-labelledby="genEndLabel"
                  aria-valuemin={1}
                  aria-valuemax={9}
                  aria-valuenow={genEnd}
                  aria-valuetext={genLabel(genEnd)}
                  tabIndex={getTabIndex()}
                />

                <div className="generationFilterRangeTrack" aria-hidden="true">
                  <div
                    className="generationFilterRangeSelected"
                    style={{
                      left: `${((genStart - 1) / 8) * 100}%`,
                      width: `${((genEnd - genStart) / 8) * 100}%`,
                    }}
                  />
                  <span className="generationFilterRangeLabel generationFilterRangeLabelLeft">Gen {genStart}</span>
                  <span className="generationFilterRangeLabel generationFilterRangeLabelRight">Gen {genEnd}</span>
                </div>
              </div>
            </fieldset>
          </li>

          <li>
            <a
              href="#searchPokemon"
              className="skipLinkTypes"
              tabIndex={getTabIndex()}
              onClick={(e) => {
                e.preventDefault();
                const searchInput = document.getElementById("searchPokemon");
                if (searchInput) {
                  searchInput.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.currentTarget.blur();
                }
              }}
            >
              Passer les filtres par types
            </a>
            <fieldset className="typeFilter">
              <legend className="typeFilterLegend">
                Filtrer par types
              </legend>
              <div className="typeFilterContainer">
                {[
                  "normal",
                  "fighting",
                  "flying",
                  "poison",
                  "ground",
                  "rock",
                  "bug",
                  "ghost",
                  "steel",
                  "fire",
                  "water",
                  "grass",
                  "electric",
                  "psychic",
                  "ice",
                  "dragon",
                  "dark",
                  "fairy",
                ].map((type) => (
                  <label key={type} className="typeFilterLabel">
                    <input
                      className="input"
                      type="checkbox"
                      name="typeSelect"
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedTypes([...selectedTypes, type]);
                        } else {
                          setSelectedTypes(
                            selectedTypes.filter((t) => t !== type),
                          );
                        }
                      }}
                      tabIndex={getTabIndex()}
                    />
                    {translateType(type)}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>

          <li>
            {/* Barre de recherche */}
            <div className="searchBar">
              <input
                className="searchBarInput"
                type="text"
                id="searchPokemon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filtrer par nom"
                tabIndex={getTabIndex()}
              />
              <label className="searchBarLabel" htmlFor="searchPokemon">Filtrer par nom</label>
            </div>
          </li>
        </ul>

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
                        searchQuery
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
                      to={`/pokedex/pokemon/${id}`}
                      aria-label={`${name} pokemon numéro ${id}`}
                    >
                      <div className="pokemonCardHeader">
                        <p>{name}</p>
                        <p>N°{id}</p>
                      </div>

                      {imageLoading && (
                        reduceMotion ? (
                          <div className="statusMessage" role="status">
                            <p>Chargement</p>
                          </div>
                        ) : (
                          <CircleLoader />
                        )
                      )}
                      <div className="pokemonCardImageContainer">
                        <img
                          src={sprite}
                          alt={name}
                          onLoad={handleImageLoaded}
                          className="pokemonCardImage"
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
