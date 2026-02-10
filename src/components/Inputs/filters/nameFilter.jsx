const NameFilter = ({ searchByName, setSearchByName, tabIndex }) => (
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
  </div>
);

export default NameFilter;
