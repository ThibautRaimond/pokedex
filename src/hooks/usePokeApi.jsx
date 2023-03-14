import { useState, useEffect } from "react";

const fetchJsonData = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

const speciesBaseUrl = "https://pokeapi.co/api/v2/pokemon-species";
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const generations = {
	gen1: { from: 1, to: 151 },
	gen2: { from: 152, to: 251 },
	gen3: { from: 252, to: 386 },
	gen4: { from: 387, to: 493 },
	gen5: { from: 494, to: 649 },
	gen6: { from: 650, to: 721 },
	gen7: { from: 722, to: 809 },
	gen8: { from: 810, to: 898 },
};
export { generations };

const useSpeciesApi = ({
	gen = "gen1",
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
