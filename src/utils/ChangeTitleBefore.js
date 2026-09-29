// Change le titre de la page avant de naviguer vers une autre page.
// Évite que le titre precedent soit vocalisé après le changement de page.
const navigateAfterTitle = (navigate, to, state) => {
  setTimeout(() => {
    if (state) {
      navigate(to, { state });
      return;
    }

    navigate(to);
  }, 0);
};

export const navigateWithTitle = ({ navigate, to, title, state }) => {
  document.title = title;
  navigateAfterTitle(navigate, to, state);
};
