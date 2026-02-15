import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

import pikachu404 from "../assets/404.png";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem("reduceMotion");
    return saved === "true";
  });

  useEffect(() => {
    // Écouter les changements de reduceMotion depuis les paramètres
    const handleStorageChange = () => {
      const saved = localStorage.getItem("reduceMotion");
      setReduceMotion(saved === "true");
    };

    window.addEventListener("reduceMotionChange", handleStorageChange);

    return () => {
      window.removeEventListener("reduceMotionChange", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const titleElement = document.getElementById("notfound-title");
    if (titleElement) {
      titleElement.focus();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Erreur 404 - Pokédex</title>
        <meta
          name="description"
          content="Oups ! Cette page n'existe pas. Retournez au Pokédex."
        />
      </Helmet>

      <div className="notFoundPage">
        <div className="notFoundContainer">
          <h1
            id="notfound-title"
            className="notFoundTitle skipTarget"
            tabIndex="-1"
            aria-live="polite"
          >
            Erreur 404
          </h1>

          <div
            className={`notFoundImageContainer ${!reduceMotion ? "animated" : ""}`}
          >
            <img src={pikachu404} alt="" className="notFoundImage" />
          </div>
          <h2 className="notFoundSubtitle">Page introuvable !</h2>

          <p className="notFoundMessage">
            Il semble que vous soyez perdu dans les hautes herbes...
            <br />
            La page que vous cherchez n'existe pas ou a été déplacée.
            <br />
            Retournez au{" "}
            <Link to="/" className="notFoundLink">
              Pokédex
            </Link>{" "}
            pour continuer votre aventure !
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
