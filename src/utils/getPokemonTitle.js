// Determine le titre a afficher pour un Pokemon avant la navigation.
const getPokemonTitle = (pokemonId, prefetch) => {
  if (prefetch?.pokemon?.name) {
    return `${prefetch.pokemon.name} - Pokedex`;
  }

  return `Pokemon N°${pokemonId} - Pokedex`;
};

export default getPokemonTitle;
