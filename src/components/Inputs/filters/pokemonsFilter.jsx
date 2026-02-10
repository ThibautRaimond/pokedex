import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import GenerationFilter from "./generationFilter";
import NameFilter from "./nameFilter";
import TypeFilter from "./typeFilter";

const PokemonsFilter = ({
  genStart,
  genEnd,
  setGenStart,
  setGenEnd,
  selectedTypes,
  setSelectedTypes,
  searchByName,
  setSearchByName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tabIndex = isOpen ? 0 : -1;

  const toggleFilters = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        className="filterSectionToggleButton"
        onClick={toggleFilters}
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
          <p className="filterSectionToggleTitle">Filtrer les pokemons</p>
        </span>
      </button>

      <ul
        className={`filterSectionContainer ${isOpen ? "isOpen" : ""}`}
        id="filterPokemonContainer"
        aria-hidden={!isOpen}
        aria-label="3 options de filtres"
      >
        <li className="generationFilterContainer">
          <GenerationFilter
            genStart={genStart}
            genEnd={genEnd}
            setGenStart={setGenStart}
            setGenEnd={setGenEnd}
            tabIndex={tabIndex}
          />
        </li>

        <li>
          <a
            href="#searchPokemon"
            className="skipLinkTypes"
            tabIndex={tabIndex}
            onClick={(event) => {
              event.preventDefault();
              const searchInput = document.getElementById("searchPokemon");
              if (searchInput) {
                searchInput.focus();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.currentTarget.blur();
              }
            }}
          >
            Passer les filtres par types
          </a>
          <TypeFilter
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            tabIndex={tabIndex}
          />
        </li>

        <li>
          <NameFilter
            searchByName={searchByName}
            setSearchByName={setSearchByName}
            tabIndex={tabIndex}
          />
        </li>
      </ul>
    </>
  );
};

export default PokemonsFilter;
