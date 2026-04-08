import { useState } from "react";
import "./generationFilter.css";

const GenerationFilter = ({
  genStart,
  genEnd,
  setGenStart,
  setGenEnd,
  tabIndex,
}) => {
  const [lastUsedHandle, setLastUsedHandle] = useState("end");
  const selectedLeftPct = ((genStart - 1) / 8) * 100;
  const selectedWidthPct = ((genEnd - genStart) / 8) * 100;
  const isOverlappedMiddleGen = genStart === genEnd && genStart !== 1 && genStart !== 9;

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

  return (
    <fieldset className="generationFilter">
      <legend id="generationGroupLabel" className="generationFilterLegend">
        Filtrer par Générations
      </legend>

      <div className="generationFilterRangeContainer" role="group">
        <label id="genStartLabel" htmlFor="gen-start" className="srOnly">
          Choisir la génération de départ
        </label>

        <input
          id="genStart"
          type="range"
          min="1"
          max="9"
          value={genStart}
          onChange={(event) => {
            setLastUsedHandle("start");
            setGenStart(Math.min(Number(event.target.value), genEnd));
          }}
          onFocus={() => setLastUsedHandle("start")}
          className={`generationFilterRangeThumb generationFilterRangeThumbStart ${
            isOverlappedMiddleGen && lastUsedHandle === "start"
              ? "generationFilterRangeThumbPinnedBlue"
              : ""
          }`}
          aria-labelledby="genStartLabel"
          aria-valuemin={1}
          aria-valuemax={9}
          aria-valuenow={genStart}
          aria-valuetext={genLabel(genStart)}
          tabIndex={tabIndex}
          disabled={genStart === 1 && genEnd === 1}
        />

        <label id="genEndLabel" htmlFor="genEnd" className="srOnly">
          Choisir la génération limite
        </label>

        <input
          id="genEnd"
          type="range"
          min="1"
          max="9"
          value={genEnd}
          onChange={(event) => {
            setLastUsedHandle("end");
            setGenEnd(Math.max(Number(event.target.value), genStart));
          }}
          onFocus={() => setLastUsedHandle("end")}
          className={`generationFilterRangeThumb generationFilterRangeThumbEnd ${
            isOverlappedMiddleGen && lastUsedHandle === "end"
              ? "generationFilterRangeThumbPinnedBlue"
              : ""
          }`}
          aria-labelledby="genEndLabel"
          aria-valuemin={1}
          aria-valuemax={9}
          aria-valuenow={genEnd}
          aria-valuetext={genLabel(genEnd)}
          tabIndex={tabIndex}
          disabled={genStart === 9 && genEnd === 9}
        />

        <div className="generationFilterRangeTrack" aria-hidden="true">
          <div
            className="generationFilterRangeSelected"
            style={{
              left: `${selectedLeftPct}%`,
              width: `${selectedWidthPct}%`,
            }}
          />
        </div>
        <div className="generationFilterRangeSteps" aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="generationFilterRangeStep">
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default GenerationFilter;
