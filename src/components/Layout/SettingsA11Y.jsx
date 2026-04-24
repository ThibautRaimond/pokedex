import { useState, useEffect, forwardRef } from "react";
import { RxCross2 } from "react-icons/rx";
import ThemeToggler from "../toggles/toggleTheme";
import ToggleMotion from "../toggles/ToggleMotion";
import { useTheme } from "../../hooks/useTheme";
import "./SettingsA11Y.css";

const SettingsA11Y = forwardRef((props, ref) => {
  const { theme, toggleTheme } = useTheme();

  /* === Gestion de la police dyslexique === */
  const [dyslexicFont, setDyslexicFont] = useState(() => {
    return localStorage.getItem("dyslexicFont") === "true";
  });

  const toggleDyslexicFont = () => {
    setDyslexicFont((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("dyslexicFont", dyslexicFont);
    if (dyslexicFont) {
      document.documentElement.classList.add("dyslexicFont");
    } else {
      document.documentElement.classList.remove("dyslexicFont");
    }
  }, [dyslexicFont]);

  // Applique l'état initial de la police dyslexique au montage
  useEffect(() => {
    if (localStorage.getItem("dyslexicFont") === "true") {
      document.documentElement.classList.add("dyslexicFont");
    }
  }, []);

  /* === Gestion des contenus en mouvement === */
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem("reduceMotion");
    return saved === "true";
  });

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
  };

  // Applique l'état initial au montage du composant
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add("reduceMotion");
    } else {
      document.documentElement.classList.remove("reduceMotion");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reduceMotion", reduceMotion);

    // Applique ou retire la classe reduceMotion sur le document
    if (reduceMotion) {
      document.documentElement.classList.add("reduceMotion");
    } else {
      document.documentElement.classList.remove("reduceMotion");
    }

    // Déclenche un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event("reduceMotionChange"));
  }, [reduceMotion]);

  const closeDialog = () => {
    if (ref?.current) {
      ref.current.close();
    }
  };

  // Focus trap : boucle la tabulation dans la modale
  useEffect(() => {
    const dialog = ref?.current;
    if (!dialog) return;

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab : si on est sur le premier élément, aller au dernier
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab : si on est sur le dernier élément, revenir au premier
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [ref]);

  return (
    <dialog
      ref={ref}
      aria-modal="true"
      aria-label="Paramètre et accessibilité"
      className="settingsDialog"
    >
      <div className="settingsContent">
        {/* Bouton de fermeture */}
        <button
          onClick={closeDialog}
          className="closeButton"
          aria-label="Fermer la boite de dialogue"
        >
          <RxCross2 />
        </button>

        <h2>Paramètre et accessibilité</h2>

          {/* Toggle du thème */}
          <div className="settingItem">
            <p aria-hidden="true">Thème</p>
            <ThemeToggler
              onChange={toggleTheme}
              state={theme}
              icons={["🌙", "☀️"]}
            />
          </div>

        <div className="settingsOptions">
          {/* Toggle des animations */}
          <div className="settingItem">
            <p aria-hidden="true">Animations</p>
            <ToggleMotion onChange={toggleReduceMotion} state={reduceMotion} />
          </div>  

          {/* Toggle police dyslexique */}
         {/*  <div className="settingItem">
            <p aria-hidden="true">Police dyslexique</p>
            <button
              onClick={toggleDyslexicFont}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleDyslexicFont();
                }
              }}
              className={`dyslexicActionButton ${dyslexicFont ? "isActive" : ""}`}
              aria-pressed={dyslexicFont}
              aria-label={dyslexicFont ? "Désactiver la police OpenDyslexic" : "Activer la police OpenDyslexic"}
            >
              <span className="dyslexicActionLabel">
                {dyslexicFont ? "Désactiver OpenDyslexic" : "Activer OpenDyslexic"}
              </span>
            </button>
            <span aria-live="polite" className="srOnly">
              {dyslexicFont ? "Police OpenDyslexic activée" : "Police OpenDyslexic désactivée"}
            </span>
          </div> */}

          {/* fin de container */}
        </div>
      </div>
    </dialog>
  );
});

SettingsA11Y.displayName = "SettingsA11Y";

export default SettingsA11Y;
