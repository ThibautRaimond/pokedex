// Change le titre de la page avant de naviguer vers une autre page.
// Evite que le titre precedent soit vocalise apres le changement de page.
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
