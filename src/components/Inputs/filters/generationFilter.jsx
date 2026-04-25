// Composant de filtre par génération avec double curseur (genStart, genEnd)
// Permet la sélection fine via drag ou click :
// - 1er clic sur un triangle = sélectionne le handle (triangle)
// - 2e clic sur la barre ou un chiffre = déplace le handle sélectionné
// - Drag natif toujours possible
// - Sélection annulée si clic hors composant ou re-clic sur le même triangle

import { useState, useRef, useEffect, useCallback } from "react";
import "./generationFilter.css";

const GenerationFilter = ({
  genStart,
  genEnd,
  setGenStart,
  setGenEnd,
  tabIndex,
}) => {
  const [lastUsedHandle, setLastUsedHandle] = useState("end");
  const [selectedHandle, setSelectedHandle] = useState(null);
  const pointerDownX = useRef(null);
  const containerRef = useRef(null);
  const selectedLeftPct = ((genStart - 1) / 8) * 100;
  const selectedWidthPct = ((genEnd - genStart) / 8) * 100;
  const isOverlappedMiddleGen = genStart === genEnd && genStart !== 1 && genStart !== 9;

  // Deselect when clicking outside the component
  useEffect(() => {
    if (!selectedHandle) return;
    const handleOutsidePointer = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSelectedHandle(null);
      }
    };
    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [selectedHandle]);

  // Applique la nouvelle valeur de génération au handle sélectionné
  const applyGen = useCallback(
    (gen) => {
      if (selectedHandle === "start") {
        setGenStart(Math.min(gen, genEnd));
        setLastUsedHandle("start");
      } else if (selectedHandle === "end") {
        setGenEnd(Math.max(gen, genStart));
        setLastUsedHandle("end");
      }
      setSelectedHandle(null);
    },
    [selectedHandle, genStart, genEnd, setGenStart, setGenEnd]
  );


  // Gestion du click court sur un triangle (sélection/désélection)
  // Ajout : sur mobile (touch), pointerDownX vaut null, donc on sélectionne toujours
  const handleThumbPointerDown = (e) => {
    if (e.type === "touchstart") {
      // Sélection immédiate sur tap tactile
      if (e.target.id === "genStart") {
        setSelectedHandle((prev) => (prev === "start" ? null : "start"));
      } else if (e.target.id === "genEnd") {
        setSelectedHandle((prev) => (prev === "end" ? null : "end"));
      }
      pointerDownX.current = null;
    } else {
      pointerDownX.current = e.clientX;
    }
  };

  const handleStartPointerUp = (e) => {
    if (pointerDownX.current !== null && Math.abs(e.clientX - pointerDownX.current) < 4) {
      setSelectedHandle((prev) => (prev === "start" ? null : "start"));
    }
    pointerDownX.current = null;
  };

  const handleEndPointerUp = (e) => {
    if (pointerDownX.current !== null && Math.abs(e.clientX - pointerDownX.current) < 4) {
      setSelectedHandle((prev) => (prev === "end" ? null : "end"));
    }
    pointerDownX.current = null;
  };

  // Click sur la barre : déplace le handle sélectionné à la génération la plus proche
  const handleTrackClick = (e) => {
    if (!selectedHandle) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const gen = Math.round(ratio * 8) + 1;
    applyGen(gen);
  };

  const isStepEnabled = (gen) => {
    if (selectedHandle === "start") {
      return gen <= genEnd && gen !== genStart;
    }
    if (selectedHandle === "end") {
      return gen >= genStart && gen !== genEnd;
    }
    return false;
  };

  // Click sur un chiffre : déplace le handle sélectionné à la génération cliquée
  const handleStepClick = (gen) => {
    if (!selectedHandle || !isStepEnabled(gen)) return;
    applyGen(gen);
  };

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

      <div
        className={`generationFilterRangeContainer${selectedHandle ? " generationFilterRangeContainerSelecting" : ""}`}
        role="group"
        ref={containerRef}
      >
        {/* Curseur de début (triangle gauche) */}
        <input
          aria-label="Génération de départ"
          type="range"
          min="1"
          max="9"
          value={genStart}
          onChange={(event) => {
            setLastUsedHandle("start");
            setGenStart(Math.min(Number(event.target.value), genEnd));
          }}
          onFocus={() => setLastUsedHandle("start")}
          onPointerDown={handleThumbPointerDown}
          onTouchStart={handleThumbPointerDown}
          onPointerUp={handleStartPointerUp}
          className={`generationFilterRangeThumb generationFilterRangeThumbStart ${
            genStart === 1 ? "generationFilterRangeThumbStartAtMin" : ""
          } ${
            isOverlappedMiddleGen && lastUsedHandle === "start"
              ? "generationFilterRangeThumbPinnedBlue"
              : ""
          } ${selectedHandle === "start" ? "generationFilterRangeThumbActive" : ""}`}
          aria-labelledby="genStartLabel"
          aria-valuemin={1}
          aria-valuemax={9}
          aria-valuenow={genStart}
          aria-valuetext={genLabel(genStart)}
          tabIndex={tabIndex}
          disabled={genStart === 1 && genEnd === 1}
        />

        {/* Curseur de fin (triangle droit) */}
        <input
          aria-label="Génération limite"
          type="range"
          min="1"
          max="9"
          value={genEnd}
          onChange={(event) => {
            setLastUsedHandle("end");
            setGenEnd(Math.max(Number(event.target.value), genStart));
          }}
          onFocus={() => setLastUsedHandle("end")}
          onPointerDown={handleThumbPointerDown}
          onTouchStart={handleThumbPointerDown}
          onPointerUp={handleEndPointerUp}
          className={`generationFilterRangeThumb generationFilterRangeThumbEnd ${
            isOverlappedMiddleGen && lastUsedHandle === "end"
              ? "generationFilterRangeThumbPinnedBlue"
              : ""
          } ${selectedHandle === "end" ? "generationFilterRangeThumbActive" : ""}`}
          aria-labelledby="genEndLabel"
          aria-valuemin={1}
          aria-valuemax={9}
          aria-valuenow={genEnd}
          aria-valuetext={genLabel(genEnd)}
          tabIndex={tabIndex}
          disabled={genStart === 9 && genEnd === 9}
        />

        {/* Barre de sélection cliquable */}
        <div
          className="generationFilterRangeTrack"
          aria-hidden="true"
          onClick={handleTrackClick}
        >
          <div
            className="generationFilterRangeSelected"
            style={{
              left: `${selectedLeftPct}%`,
              width: `${selectedWidthPct}%`,
            }}
          />
        </div>
        {/* Chiffres de génération cliquables en mode sélection */}
        <div className="generationFilterRangeSteps" aria-hidden="true">
          {[...Array(9)].map((_, i) => {
            const gen = i + 1;
            const stepEnabled = isStepEnabled(gen);
            return (
              <span
                key={i}
                className={`generationFilterRangeStep${stepEnabled ? " generationFilterRangeStepClickable" : ""}`}
                onClick={() => handleStepClick(gen)}
              >
                {gen}
              </span>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
};

export default GenerationFilter;
