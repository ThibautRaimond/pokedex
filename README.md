# Pokédex A11Y

A fully accessible Pokédex built with React. This project delivers a responsive experience, detailed Pokémon pages, smart filters, and navigation optimized for screen readers and keyboard users.

## 🚀 Overview

- React application created with Create React App and deployed on GitHub Pages.
- Uses the public [PokéAPI](https://pokeapi.co) to fetch Pokémon data.
- Route-based navigation with `react-router-dom`.
- UI designed for accessibility: visible focus states, dark mode, reduced motion support, and ARIA announcements.

## ✨ Key Features

- Searchable and filterable Pokémon list by name, type, and generation.
- Detailed Pokémon profile pages with description, types, weight, height, and images.
- Custom 404 page and graceful handling of unknown routes.
- Keyboard navigation and accessible loading/status announcements.
- Dark mode support that respects system preferences.
- GitHub Pages deployment ready.

## 🧩 Tech Stack

- React 18
- React Router 6
- Axios
- React Helmet
- Framer Motion
- Material UI (`@mui/material`)
- GitHub Pages (`gh-pages`)
- Prettier

## 📁 Project Structure

- `src/App.js` — application root.
- `src/components/Router.jsx` — route definitions and navigation handling.
- `src/pages/HomePage.jsx` — accessible homepage.
- `src/pages/PokemonsPage.jsx` — Pokémon list with filters.
- `src/pages/PokedexPage.jsx` — Pokémon detail page.
- `src/pages/NotFoundPage.jsx` — custom 404 page.
- `src/components/Inputs/filters/` — filter components and search UI.
- `src/hooks/usePokeApi.jsx` — data fetching hook.
- `src/api/getPokemonDetails.js` — API utility functions.
- `src/styles/` — global styles, themes, and utilities.

## 💻 Installation

```bash
npm install
```

## ▶️ Local Development

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## ✅ Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server |
| `npm run build` | Creates a production build in `build/` |
| `npm test` | Runs the test runner |
| `npm run format` | Formats code with Prettier |
| `npm run deploy` | Deploys the site to GitHub Pages |

## 🚢 Deployment

The project is configured for GitHub Pages using the `homepage` field and `gh-pages`.

```bash
npm run deploy
```

## 🛠 Customization

- Update UI and page layout in `src/pages/`.
- Refine filtering logic in `src/components/Inputs/filters/`.
- Adjust API behavior in `src/api/` and `src/hooks/`.
- Improve accessibility in `src/components/`.

## 🤝 Contributing

1. Fork the repository.
2. Create a dedicated branch.
3. Open a pull request.

## 📌 Notes

This project is built to be usable by everyone, including users with visual, motor, and cognitive disabilities.

---

Professional and deployment-ready README for the Pokédex A11Y project.