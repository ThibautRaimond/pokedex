import "./toggleTheme.css";

const ToggleTheme = ({ onChange, state, icons }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange();
    }
  };

  // texte pour aria-label du bouton : ce que le clic fera
  const actionLabel =
    state === "dark" ? "Activer le thème clair" : "Activer le thème sombre";
  // texte à vocaliser après changement
  const liveText =
    state === "dark" ? "Thème sombre activé" : "Thème clair activé";

  return (
    <div className="toggleContainer">
      <div
        id="toggle-switch"
        className={`darkModeInput ${state === "dark" ? "inputChecked" : ""}`}
        checked={state === "dark"}
        readOnly
      />
      <div
        className="toggleLabel"
        tabIndex="0"
        role="button"
        aria-label={actionLabel} // indique ce que le clic fera
        onClick={onChange}
        onKeyDown={handleKeyDown}
      >
        <span className="toggleThumb"></span>
        {state === "dark" && (
          <span className="leftIcon" aria-hidden="true">
            <span role="img" className="leftIcon" alt="">
              {icons[0] || ""}
            </span>
          </span>
        )}
        {state === "light" && (
          <span className="rightIcon" aria-hidden="true">
            <span role="img" className="rightIcon" alt="">
              {icons[1] || ""}
            </span>
          </span>
        )}
      </div>

      {/* texte invisible pour vocaliser le changement d'état */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        {liveText}
      </div>
    </div>
  );
};

export default ToggleTheme;
