import { useEffect, useState } from "react";

function SkipLink() {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    // Récupérer le titre de la page au montage et à chaque changement
    const updateTitle = () => {
      setPageTitle(document.title);
    };

    updateTitle();

    // Observer les changements du titre
    // react-helmet remplace l'élément <title> entier, donc on observe document.head
    const observer = new MutationObserver(updateTitle);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const handleSkipClick = (e, targetType) => {
    e.preventDefault();
    
    if (targetType === "main-content") {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        const skipTarget = mainElement.querySelector('.skipTarget');
        const focusTarget = skipTarget ?? mainElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )[0];

        if (focusTarget) {
          // Calcule la position de <main> dans le viewport et l'expose en CSS custom properties
          // pour que le pseudo-élément ::after de body dessine le cadre au bon endroit
          const rect = mainElement.getBoundingClientRect();
          document.documentElement.style.setProperty('--skip-ring-top', `${rect.top}px`);
          // Hauteur plafonnée au viewport : main peut être plus grand que l'écran
          document.documentElement.style.setProperty('--skip-ring-height', `${Math.min(rect.height, window.innerHeight - rect.top)}px`);
          // La classe déclenche l'affichage du cadre via CSS (SkipLink.css)
          document.body.classList.add('skip-ring-active');
          focusTarget.focus({ preventScroll: true });
          focusTarget.addEventListener('blur', () => {
            document.body.classList.remove('skip-ring-active');
          }, { once: true });
        }
      }
    } else {
      // Pour les autres cibles (comme footer)
      const element = document.getElementById(targetType);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && document.activeElement?.classList?.contains("skipLink")) {
        document.activeElement.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div id="page-title-announce-hidden" className="srOnly" tabIndex="-1">Page {pageTitle}</div>
      <nav className="skipLinks" aria-label="Accès rapide">
      <a
        href="#main-content"
        className="skipLink"
        onClick={(e) => handleSkipClick(e, "main-content")}
      >
        Aller au contenu principal
      </a>
      <a
        href="#footer"
        className="skipLink"
        onClick={(e) => handleSkipClick(e, "footer")}
      >
        Aller au pied de page
      </a>
    </nav>
    </>
  );
}

export default SkipLink;
