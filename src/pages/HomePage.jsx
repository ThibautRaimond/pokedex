import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Helmet } from "react-helmet";

import { useSpeciesApi } from "../hooks/usePokeApi";
import { translateType } from "../locales/types";

import ScrollToTopButton from "../components/Inputs/ScrollToTopButton";
import ScrollToBotButton from "../components/Inputs/ScrollToBotButton";
import PokeballLoader from "../components/Inputs/PokeballLoader";
import CircleLoader from "../components/Inputs/CircleLoader";
import "../components/Layout/SkipLink.css";
import "./HomePage.css";

const HomePage = () => {
  /* === Gestion API pokemon === */
  const contentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const {
    data,
    isLoading,
    genStart,
    genEnd,
    setGenStart,
    setGenEnd,
  } = useSpeciesApi();

  /* === Messages d'accessibilité pour le chargement === */
  const [statusMessage, setStatusMessage] = useState("");

  const LOADING_MESSAGE = "pokemon en chargement";
  const LOADED_MESSAGE = "chargement terminé";

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
          setStatusMessage(LOADING_MESSAGE);
        }, 100);
      }, 1000);
    } else if (data) {
      // Quand le chargement est terminé, ré-insertion rapide
      setStatusMessage("");
      reinsertTimeoutId = setTimeout(() => {
        setStatusMessage(LOADED_MESSAGE);
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
      <div ref={contentRef} className="homePageContainer">
        {/* Bouton menu des filtres */}
        <button
          className="filterPokemonContainerWithButton__toggleDiv"
          onClick={toggleDiv}
          aria-expanded={isOpen}
          aria-controls="filter-pokemon-container"
          type="button"
        >
          {isOpen ? (
            <RxCross2 className="toggleDiv__toggler" size={25} />
          ) : (
            <RxHamburgerMenu className="toggleDiv__toggler" size={25} />
          )}
          <span className="toggleDiv__openOrCloseFilter">
            <p className="openOrCloseFilter__filterTitle">
              Filtrer les pokemons
            </p>
          </span>
        </button>

        <ul
          className={`homePageContainer__filterPokemonContainer ${isOpen ? "open" : ""}`}
          id="filter-pokemon-container"
          aria-hidden={!isOpen}
          aria-label="3 options de filtres"
        >
          <li className="rangeThumbcontainer">
            <fieldset className="generationRange">
              <legend
                id="generation-group-label"
                className="generationRange_legend"
              >
                Filtrer par Générations
              </legend>

              <div className="rangeContainer" role="group">
                {/* Slider début */}
                <label
                  id="gen-start-label"
                  htmlFor="gen-start"
                  className="sr-only"
                >
                  Choisir la génération de départ
                </label>

                <input
                  id="gen-start"
                  type="range"
                  min="1"
                  max="9"
                  value={genStart}
                  onChange={(e) =>
                    setGenStart(Math.min(Number(e.target.value), genEnd))
                  }
                  className="rangeThumb start"
                  aria-labelledby="gen-start-label"
                  aria-valuemin={1}
                  aria-valuemax={9}
                  aria-valuenow={genStart}
                  aria-valuetext={genLabel(genStart)}
                  tabIndex={getTabIndex()}
                  disabled={genStart === 1 && genEnd === 1}
                />

                {/* Slider fin */}
                <label id="gen-end-label" htmlFor="gen-end" className="sr-only">
                  Choisir la génération limite
                </label>

                <input
                  id="gen-end"
                  type="range"
                  min="1"
                  max="9"
                  value={genEnd}
                  onChange={(e) =>
                    setGenEnd(Math.max(Number(e.target.value), genStart))
                  }
                  className="rangeThumb end"
                  aria-labelledby="gen-end-label"
                  aria-valuemin={1}
                  aria-valuemax={9}
                  aria-valuenow={genEnd}
                  aria-valuetext={genLabel(genEnd)}
                  tabIndex={getTabIndex()}
                />

                <div className="rangeTrack" aria-hidden="true">
                  <div
                    className="rangeSelected"
                    style={{
                      left: `${((genStart - 1) / 8) * 100}%`,
                      width: `${((genEnd - genStart) / 8) * 100}%`,
                    }}
                  />
                  <span className="rangeLabel left">Gen {genStart}</span>
                  <span className="rangeLabel right">Gen {genEnd}</span>
                </div>
              </div>
            </fieldset>
          </li>

          <li>
            <a
              href="#searchPokemon"
              className="skip-link-types"
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
            <fieldset className="typesFieldset">
              <legend className="TypesSelectContainer__Legend">
                Filtrer par types
              </legend>
              <div className="filterPokemonContainer__typeSelectContainer">
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
                  <label key={type} className="typeSelectContainer__types">
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
                            selectedTypes.filter((t) => t !== type)
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
            <div className="floatingInput">
              <input
                className="input inputSearchPokemon"
                type="text"
                id="searchPokemon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filtrer par nom"
                tabIndex={getTabIndex()}
              />
              <label htmlFor="searchPokemon">Filtrer par nom</label>
            </div>
          </li>
        </ul>

        {/* Loader ou erreur */}
        {isLoading && <PokeballLoader />}

        {/* Message status pour l'accessibilité */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {statusMessage}
        </div>

        {/* {isError && (
          <div
            className="homePageContainer__errorLoading LoadingMessage"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {showErrorContent && (
              <p key={errorKey}>
                <MdReportGmailerrorred
                  aria-hidden="true"
                  className="error-icon message-icon"
                />
                Erreur dans le filtrage des Pokemons
              </p>
            )}
          </div>
        )} */}

        {/* message succès */}
        {/* {showMessage && (
          <div
            className="LoadingMessage homePageContainer__successLoading"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {showSuccessContent && (
              <p key={successKey}>
                <FaRegCheckCircle
                  aria-hidden="true"
                  className="success-icon message-icon"
                />
                Filtres appliqués avec succès
              </p>
            )}
          </div>
        )} */}

        {/* Liste des pokemons filtrés */}
        {data && (
          <ul
            className="homePageContainer__pokemonsContainer"
            id="list-container"
          >
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
                        .replace(/[\u0300-\u036f]/g, "")
                    ) &&
                  (selectedTypes.length > 0
                    ? types.some((t) => selectedTypes.includes(t))
                    : true)
              )
              .map(({ id, name, types, sprite }, index) => (
                <li
                  className={`${types[0]} pokemonsContainer__pokemonContainer`}
                  key={index}
                >
                  <Link
                    to={`/pokedex/pokemon/${id}`}
                    aria-label={`Visionner ${name} pokemon numéro ${id}`}
                  >
                    <div className="pokemonContainer__NameAndId">
                      <p>{name}</p>
                      <p>N°{id}</p>
                    </div>

                    {imageLoading && <CircleLoader />}
                    <div className="pokemonContainer__imgContainer">
                      <img
                        src={sprite}
                        alt={name}
                        onLoad={handleImageLoaded}
                        className="imgContainer__PokemonImg"
                      />
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        )}

        <ScrollToTopButton alt="retourner en haut de la page" />
        <ScrollToBotButton alt="accéder au bas de la page" />
      </div>
    </div>
  );
};

export default HomePage;
