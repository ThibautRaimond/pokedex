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
              <span className="toggle-motion-button" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                  ></path>
                </svg>
              </span>
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
