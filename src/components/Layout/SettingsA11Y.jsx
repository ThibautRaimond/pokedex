import { useState, useEffect, forwardRef } from "react";
import { RxCross2 } from "react-icons/rx";
import ThemeToggler from "../Inputs/toggleTheme";
import { useTheme } from "../../hooks/useTheme";
import "../Inputs/ToggleMotion.css";
import "./SettingsA11Y.css";

const SettingsA11Y = forwardRef((props, ref) => {
  const { theme, toggleTheme } = useTheme();

  /* === Gestion des contenus en mouvement === */
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('reduceMotion');
    return saved === 'true';
  });

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
  };

  // Applique l'état initial au montage du composant
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reduceMotion', reduceMotion);
    
    // Applique ou retire la classe reduce-motion sur le document
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Déclenche un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event('reduceMotionChange'));
  }, [reduceMotion]);

  const closeDialog = () => {
    if (ref?.current) {
      ref.current.close();
    }
  };

  return (
    <dialog 
      ref={ref}
      aria-modal="true" 
      aria-label="Paramètre et accessibilité"
      className="settings-dialog"
    >
      <div className="settings-content">
        <h2>Paramètre et accessibilité</h2>
        
        {/* Bouton de fermeture */}
        <button 
          onClick={closeDialog}
          className="close-button"
          aria-label="Fermer les paramètres"
        >
          <RxCross2 />
        </button>

        <div className="settings-options">
          {/* Toggle des animations */}
          <div className="setting-item">
            <p>Animations</p>
            <button 
              onClick={toggleReduceMotion}
              className={`reduce-motion-container ${reduceMotion ? 'active' : ''}`}
              aria-label={reduceMotion ? "Activer les animations" : "Désactiver les animations"}
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
                {reduceMotion ? "Activer les animations" : "Désactiver les animations"}
              </span>
            </button>
            <div aria-live="polite" className="sr-only">
              {reduceMotion ? "Animations désactivées" : "Animations activées"}
            </div>
            
          </div>

          {/* Toggle du thème */}
          <div className="setting-item">
            <p>Thème</p>
            <ThemeToggler
              onChange={toggleTheme}
              state={theme}
              icons={["🌙", "☀️"]}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
});

SettingsA11Y.displayName = "SettingsA11Y";

export default SettingsA11Y;
