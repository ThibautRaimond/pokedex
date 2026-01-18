import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";

import App from "./App";
import "./styles/resetCss.css";
import "./styles/index.css";
import cursorMew from "./assets/gam178.cur";

// Fonction globale pour activer le curseur Mew
window.mew = () => {
  document.body.classList.add("mew-cursor");
  console.log("Mew! ✨ Bravo, le curseur a été changé!");
  console.log("undomew() pour le désactiver.");
};

// Fonction globale pour désactiver le curseur Mew
window.undomew = () => {
  document.body.classList.remove("mew-cursor");
  console.log("Le curseur est revenu à la normale.");
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
