import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import a11ypok from "../assets/a11ypok.jpg";
import profthib from "../assets/profthib.jpg";
import deficientsmoteur from "../assets/deficientsmoteur.webp";
import deficientsvisuel from "../assets/deficientsvisuel.webp";
import deficientsmentaux from "../assets/deficientsmentaux.webp";

import "./HomePage.css";

const features = [
  {
    iconSrc: deficientsmoteur,
    title: "Navigation au clavier",
    desc: (
      <>
        Toutes les fonctionnalités sont accessibles à la navigation au clavier
        avec une prise de focus visible.
        <br />
        Des liens d'accès rapide et d'évitement sont disponibles pour assurer
        une navigation fluide et efficace, même sans souris.
        <br />
        Le site est également conçu pour fonctionner avec un outil de curseur
        sans geste complexe.
      </>
    ),
  },
  {
    iconSrc: deficientsvisuel,
    title: "Outils d'assistance",
    desc: (
      <>
        La structure des pages et les composants utilisés sont conçus pour rendre
        le site accessible aux lecteurs d'écran et aux plages brailles.
        <br />
        Les intitulés de chaque éléments sont choisie de manière à palier l'absence de contexte visuel.
        <br />
        Les problématiques liées à l'utilisation d'un environnement <span lang="en">"Single Page Application"</span> sont également prises en compte.
      </>
    ),
  },
  {
    iconSrc: deficientsvisuel,
    title: "Contraste et thème",
    desc: "Mode clair et mode sombre disponibles avec des ratios de contraste conformes aux normes  pour assurer une bonne lisibilité. De plus ce mode est automatiquement activé si vous avez choisi un thème sombre dans les préférences de votre système, évitant ainsi les problématiques liées à la photophobie.",
  },
  {
    iconSrc: deficientsmentaux,
    title: "Mode sans animations",
    desc: 'Toutes les animations sont désactivées par défaut si vous avez activé "Réduire les animations" dans les préférences de votre système ou que vous utilisez le bouton adéquat.',
  },
];

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <Helmet>
        <title>Accueil - Pokédex A11Y</title>
        <meta
          name="description"
          content="Bienvenue sur le Pokédex accessible et inclusif. Découvrez des fiches Pokémon conçues pour être lisibles, navigables au clavier, et adaptées aux personnes en situation de handicap."
        />
      </Helmet>

      {/* Titre principal */}
      <h1
        id="page-title-announce"
        tabIndex="-1"
        className="homeTitle skipTarget"
      >
        <span className="srOnly">Accueil</span>
      </h1>

      {/* Professeur Thib */}
      <div className="profSection">
        <img src={profthib} alt="" className="profImg" />
        <div className="profDialogBox">
          <p className="profName">
            <span className="srOnly">Message de &emsp;</span>Professeur Thib
          </p>
          <blockquote>
            <p className="profText">
              Bonjour, jeune dresseur ! Je suis le Professeur Thib.
            </p>
            <p className="profText">
              J’ai consacré mes recherches à créer un Pokédex accessible à tous,
              afin que chaque passionné puisse découvrir les Pokémon sans
              obstacle.
            </p>
            <p className="profText">
              Cette mission t’est confiée… ouvre-le et commence ton voyage !
            </p>
          </blockquote>
          <Link to="/pokemonspage" className="startButton">
            <span aria-hidden="true">▶</span> Ouvrir le Pokédex
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="homeFeaturesSection">
        <h2 id="features-title" className="homeSectionTitle">
          Fonctionnalités d'accessibilité
        </h2>
        {/* Sous-titre */}
        <p className="homeSubtitle">
          Un Pokédex pensé pour <strong>tout le monde</strong> conçu avec les
          normes RGAA et les bonnes pratiques pour être utilisable par les
          personnes en situation de handicap.
        </p>
        <ul className="homeFeaturesList">
          {features.map((f) => (
            <li key={f.title} className="homeFeatureCard">
              <span className="homeFeatureIcon" aria-hidden="true">
                {f.iconSrc ? <img src={f.iconSrc} /> : <span>{f.icon}</span>}
              </span>
              <h3 className="homeFeatureTitle">{f.title}</h3>
              <p className="homeFeatureDesc">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* À propos */}
      <div className="homeAboutSection" aria-labelledby="about-title">
        <div className="homeAboutContent">
          <h2 id="about-title" className="homeSectionTitle homeAboutTitle">
            À propos du projet
          </h2>
          <p className="homeAboutText">
            Ce projet est né de la conviction que les loisirs numériques doivent
            être accessibles à tous. En s’appuyant sur les données de{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="homeLink"
            >
              PokéAPI
            </a>
            , ce Pokédex propose des informations sur chaque Pokémon dans une
            interface inclusive, après avoir testé sa compatabilité liées aux
            différentes situations de handicap.
          </p>
          <p className="homeAboutText">
            Je vous souhaite une excellente exploration de ce Pokédex, et
            surtout, n’hésitez pas à me faire part de vos retours pour continuer
            à améliorer son accessibilité !
          </p>
        </div>
        <img src={a11ypok} className="homeImage" />
      </div>
    </div>
  );
};

export default HomePage;
