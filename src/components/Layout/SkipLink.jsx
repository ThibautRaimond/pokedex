import { useEffect } from "react";

function SkipLink() {
  const handleSkipClick = (e, targetType) => {
    e.preventDefault();
    
    if (targetType === "main-content") {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        // Chercher d'abord un heading avec la classe skip-target
        const skipTarget = mainElement.querySelector('.skip-target');
        if (skipTarget) {
          skipTarget.focus({ preventScroll: true });
        } else {
          // Sinon, chercher le premier élément focusable
          const focusableElements = mainElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length > 0) {
            focusableElements[0].focus({ preventScroll: true });
          }
        }
      }
    } else {
      // Pour les autres cibles (comme footer)
      const element = document.getElementById(targetType);
      if (element) {
        element.focus({ preventScroll: true });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && document.activeElement?.classList?.contains("skip-link")) {
        document.activeElement.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="skip-links" aria-label="liens d'accès rapide">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => handleSkipClick(e, "main-content")}
      >
        Aller au contenu principal
      </a>
      <a
        href="#footer"
        className="skip-link"
        onClick={(e) => handleSkipClick(e, "footer")}
      >
        Aller au pied de page
      </a>
    </nav>
  );
}

export default SkipLink;
