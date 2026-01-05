import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

import { generations, useGenerations } from "../hooks/useGenerations";
import { useSpeciesApi } from "../hooks/usePokeApi";
import { translateType } from "../locales/types";
import ScrollToTopButton from "../components/Inputs/ScrollToTopButton";
import ScrollToBotButton from "../components/Inputs/ScrollToBotButton";
import PokeballLoader from "../components/Inputs/PokeballLoader";
import CircleLoader from "../components/Inputs/CircleLoader";
import "./HomePage.css";

const HomePage = () => {
  const contentRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

const { selectedGeneration, genFrom, genTo, handleChangeGeneration } = useGenerations();

  const { data, isLoading, isError } = useSpeciesApi({
    from: genFrom,
    to: genTo,
  });

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
    <main className="homePage">
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
            <h3 className="openOrCloseFilter__filterTitle">Filtrer les pokemons</h3>
          </span>
        </button>

        <div
          className={`homePageContainer__filterPokemonContainer ${isOpen ? "open" : ""}`}
          id="filter-pokemon-container"
          aria-hidden={!isOpen}
        >

        <fieldset>
  <legend className="generationSelectContainer__Legend">
    Choisir une génération :
      </legend>

  <div className="filterPokemonContainer__generationSelectContainer">
    {Object.keys(generations).map((gen) => (
  <label key={gen} htmlFor={`gen-${gen}`}>
    <input
      type="radio"
      name="generation"
      id={`gen-${gen}`}
      value={gen}
      checked={selectedGeneration === gen}
      onChange={() => handleChangeGeneration(gen)}
      tabIndex={getTabIndex()}
    />
    {gen.toUpperCase()}
  </label>
))}

  </div>
</fieldset>


<fieldset>
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
                  type="checkbox"
                  name="typeSelect"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedTypes([...selectedTypes, type]);
                    } else {
                      setSelectedTypes(selectedTypes.filter((t) => t !== type));
                    }
                  }}
                  tabIndex={getTabIndex()}
                />
                {translateType(type)}
              </label>
            ))}
          </div>
          </fieldset>
                   {/* Barre de recherche */}
          <input
            className="homePageContainer__searchPokemonByName"
            type="text"
            placeholder="Nom du pokemon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Recherche par nom de pokemon"
            tabIndex={getTabIndex()}
          />
          
        </div>

        {/* Loader ou erreur */}
        {isLoading && <PokeballLoader />}
        {isError && <p>Erreur</p>}

        {/* Liste des pokemons filtrés */}
        {data && (
          <ul className="homePageContainer__pokemonsContainer" id="list-container">
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
                  <Link to={`/pokedex/pokemon/${id}`} aria-label={`Visionner ${name} pokemon numéro ${id}`}>
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
    </main>
  );
};

export default HomePage;