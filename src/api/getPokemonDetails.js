export const getPokemonDetails = async (pokemonId) => {
  const normalizeFlavorText = (text) =>
    text.replace(/[\n\f]+/g, " ").replace(/\s+/g, " ").trim();
  // Charger les donnees principales du Pokemon
  const pokemonApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
  );

  if (!pokemonApiResponse.ok) {
    throw new Error("Échec de la récupération des données du Pokémon");
  }

  const pokemonData = await pokemonApiResponse.json();

  // Charger les donnees d'espece (nom FR, description, categorie)
  const speciesApiResponse = await fetch(pokemonData.species.url);

  if (!speciesApiResponse.ok) {
    throw new Error("Échec de la récupération des données d'espèce du Pokémon");
  }

  const speciesData = await speciesApiResponse.json();
  const getFrenchEntry = (entries) =>
    entries.find((entry) => entry.language.name === "fr");

  const frenchName = getFrenchEntry(speciesData.names);
  const frenchDescription = getFrenchEntry(speciesData.flavor_text_entries);
  const frenchCategory = getFrenchEntry(speciesData.genera);

  const name = frenchName ? frenchName.name : pokemonData.name;
  const description = frenchDescription
    ? normalizeFlavorText(frenchDescription.flavor_text)
    : "Description indisponible.";
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  const backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`;

  return {
    id: Number(pokemonId),
    pokemon: {
      name,
      description,
      image,
      backImage,
    },
    types: pokemonData.types.map((typeEntry) => typeEntry.type.name),
    weight: pokemonData.weight,
    height: pokemonData.height,
    category: frenchCategory ? frenchCategory.genus : "",
  };
};
