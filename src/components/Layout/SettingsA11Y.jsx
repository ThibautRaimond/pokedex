import { useState, useEffect, forwardRef } from "react";
import { RxCross2 } from "react-icons/rx";
import ThemeToggler from "../Inputs/toggleTheme";
import ToggleMotion from "../Inputs/toggleMotion";
import { useTheme } from "../../hooks/useTheme";
import "./settingsA11Y.css";

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
      document.documentElement.classList.add('reduceMotion');
    } else {
      document.documentElement.classList.remove('reduceMotion');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reduceMotion', reduceMotion);
    
    // Applique ou retire la classe reduceMotion sur le document
    if (reduceMotion) {
      document.documentElement.classList.add('reduceMotion');
    } else {
      document.documentElement.classList.remove('reduceMotion');
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
      className="settingsDialog"
    >
      <div className="settingsContent">
        <h2>Paramètre et accessibilité</h2>
        
        {/* Bouton de fermeture */}
        <button 
          onClick={closeDialog}
          className="closeButton"
          aria-label="Fermer les paramètres"
        >
          <RxCross2 />
        </button>

        <div className="settingsOptions">
          {/* Toggle des animations */}
          <div className="settingItem">
            <p>Animations</p>
            <ToggleMotion
              onChange={toggleReduceMotion}
              state={reduceMotion}
            />
          </div>

          {/* Toggle du thème */}
          <div className="settingItem">
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
