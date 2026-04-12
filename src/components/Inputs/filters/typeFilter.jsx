import { translateType } from "../../../locales/types";
import "./typeFilter.css";

const TypeFilter = ({ selectedTypes, setSelectedTypes, tabIndex }) => (
  <fieldset className="typeFilter">
    <legend className="typeFilterLegend">Filtrer par types</legend>
    <ul className="typeFilterContainer">
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
        <li key={type} className="typeFilterItem">
          <label className="typeFilterLabel">
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
                  setSelectedTypes(selectedTypes.filter((t) => t !== type));
                }
              }}
              tabIndex={tabIndex}
            />
            {translateType(type)}
          </label>
        </li>
      ))}
    </ul>
  </fieldset>
);

export default TypeFilter;
