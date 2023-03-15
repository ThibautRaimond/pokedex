import { useState, useEffect } from "react";
import { generations } from "./useGenerations"

const fetchJsonData = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

const speciesBaseUrl = "https://pokeapi.co/api/v2/pokemon-species";
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const useSpeciesApi = ({
	gen = "1",
	from = generations[gen].from,
	to = generations[gen].to,
}) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setIsError(false);

			try {
				const response = await fetch(
					`${speciesBaseUrl}?offset=${from - 1}&limit=${to}`
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
			} catch (error) {
				setIsError(true);
			}

			setIsLoading(false);
		})();
	}, [gen, from, to]);

	return { data, isLoading, isError };
};

export { useSpeciesApi };
