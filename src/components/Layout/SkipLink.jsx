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
    const titleElement = document.querySelector('title');
    if (titleElement) {
      const observer = new MutationObserver(updateTitle);
      observer.observe(titleElement, { 
        childList: true, 
        characterData: true, 
        subtree: true 
      });
      
      return () => observer.disconnect();
    }
  }, []);

  const handleSkipClick = (e, targetType) => {
    e.preventDefault();
    
    if (targetType === "main-content") {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        // Chercher d'abord un heading avec la classe skipTarget
        const skipTarget = mainElement.querySelector('.skipTarget');
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
      <div id="page-title-announce" className="srOnly" tabIndex="-1">Page {pageTitle}</div>
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
