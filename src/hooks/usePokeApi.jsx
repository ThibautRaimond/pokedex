import { useState, useEffect } from "react";

const fetchJsonData = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

const speciesBaseUrl = "https://pokeapi.co/api/v2/pokemon-species";
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const useSpeciesApi = (params) => {
	const { from = 1, to = 898 } = params;
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setIsError(false);

			// Fetch(fonction qui questionne un URL) qui remplace axios:
			try {
				// Recuperation des données depuis l'api + convertion en json:
				const response = await fetch(
					`${speciesBaseUrl}?offset=${from - 1}&limit=${to}`
				);
				const json = await response.json();

				// Nouveau call API pour chaque Pokemon pour acceder aux données traduites et aux types:
				const translatedPokemons = await Promise.all(
					// url necessaire pour le onClick des pokemons
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
			} catch (error) {
				setIsError(true);
			}

			setIsLoading(false);
		})();
	}, [from, to]);

	return { data, isLoading, isError };
};

export { useSpeciesApi };


