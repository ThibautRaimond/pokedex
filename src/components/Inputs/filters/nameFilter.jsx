import { RxCross2 } from "react-icons/rx";
import "./nameFilter.css";

const NameFilter = ({ searchByName, setSearchByName, tabIndex }) => {
  const clearSearch = () => {
    setSearchByName("");
  };

  return (
    <div className="searchBar">
      <input
        className="searchBarInput"
        type="text"
        id="searchPokemon"
        value={searchByName}
        onChange={(event) => setSearchByName(event.target.value)}
        aria-label="Filtrer par nom"
        tabIndex={tabIndex}
      />
      <label className="searchBarLabel" htmlFor="searchPokemon">
        Filtrer par nom
      </label>
      {searchByName.length > 0 && (
        <button
          type="button"
          onClick={clearSearch}
          className="searchBarClear"
          aria-label="Effacer la recherche"
          tabIndex={0}
        >
          <RxCross2 />
        </button>
      )}
    </div>
  );
};

export default NameFilter;
