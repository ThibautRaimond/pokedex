import "./ToggleMotion.css";

const ToggleMotion = ({ onChange, state }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange();
    }
  };

  // texte du bouton
  const actionLabel = state
    ? "Activer les animations"
    : "Désactiver les animations";
  
  // texte à vocaliser après changement
  const liveText = state ? "Animations désactivées" : "Animations activées";

  return (
    <>
      <button
        onClick={onChange}
        onKeyDown={handleKeyDown}
        className={`reduce-motion-container ${state ? 'active' : ''}`}
        aria-label={actionLabel}
      >
        <div className="switch" aria-hidden="true">
          <div className="button">
            <div className="light"></div>
            <div className="dots"></div>
            <div className="shadow"></div>
            <div className="characters"></div>
            <div className="shine"></div>
          </div>
        </div>
        <span className="toggle-motion-label" aria-hidden="true">
          {actionLabel}
        </span>
      </button>
      <div aria-live="polite" className="sr-only">
        {liveText}
      </div>
    </>
  );
};

export default ToggleMotion;
