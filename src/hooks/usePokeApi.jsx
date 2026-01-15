import { useState, useEffect } from "react";

const fetchJsonData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const speciesBaseUrl = "https://pokeapi.co/api/v2/pokemon-species";
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

// Hook pour gérer les générations et les Pokémon
const useSpeciesApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Gestion des générations
  const [generationsData, setGenerationsData] = useState(null);
  const [isLoadingGenerations, setIsLoadingGenerations] = useState(true);
  const [genStart, setGenStart] = useState(1);
  const [genEnd, setGenEnd] = useState(9);

  // Charger les données des générations depuis PokeAPI
  useEffect(() => {
    const fetchGenerations = async () => {
      setIsLoadingGenerations(true);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/generation");
        const data = await response.json();
        
        const generationsDetails = await Promise.all(
          data.results.map(async (gen) => {
            const genResponse = await fetch(gen.url);
            const genData = await genResponse.json();
            return {
              id: genData.id,
              name: genData.name,
              pokemonSpecies: genData.pokemon_species,
            };
          })
        );
        
        const sortedGenerations = generationsDetails.sort((a, b) => a.id - b.id);
        const formattedGenerations = {};
        
        sortedGenerations.forEach((gen) => {
          const ids = gen.pokemonSpecies.map(species => {
            const url = species.url;
            const id = parseInt(url.split('/').filter(Boolean).pop());
            return id;
          });
          
          formattedGenerations[gen.id] = {
            from: Math.min(...ids),
            to: Math.max(...ids),
            name: gen.name,
            count: gen.pokemonSpecies.length,
          };
        });
        
        setGenerationsData(formattedGenerations);
      } catch (error) {
        console.error("Erreur lors du chargement des générations:", error);
        setIsError(true);
      } finally {
        setIsLoadingGenerations(false);
      }
    };
    
    fetchGenerations();
  }, []);

  // Calculer from et to en fonction des générations sélectionnées
  const genFrom = generationsData?.[genStart]?.from;
  const genTo = generationsData?.[genEnd]?.to;

  // Charger les Pokémon quand les générations sont prêtes
  useEffect(() => {
    if (!genFrom || !genTo || isLoadingGenerations) return;

    (async () => {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      try {
        const response = await fetch(
          `${speciesBaseUrl}?offset=${genFrom - 1}&limit=${genTo - genFrom + 1}`
        );
        const json = await response.json();

        const translatedPokemons = await Promise.all(
          json.results.map(async ({ url }) => {
            const { names, id } = await fetchJsonData(url);
            const { types } = await fetchJsonData(`${baseUrl}/${id}`);

            return {
              id,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              types: types.map((type) => type.type.name),
              name: names.find((n) => n.language.name === "fr").name,
            };
          })
        );

        setData(translatedPokemons);
        setIsSuccess(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [genFrom, genTo, isLoadingGenerations]);

  return { 
    data, 
    isLoading, 
    isError, 
    isSuccess,
    genStart,
    genEnd,
    setGenStart,
    setGenEnd,
    genFrom,
    genTo,
    generationsData,
    isLoadingGenerations,
  };
};

export { useSpeciesApi };
