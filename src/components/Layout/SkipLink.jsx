import { useEffect } from "react";

function SkipLink() {
  const handleSkipClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth" });
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
        href="#main-anchor"
        className="skip-link"
        onClick={(e) => handleSkipClick(e, "main-anchor")}
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
