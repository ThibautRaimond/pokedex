import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/resetCss.css";
import "../styles/pokedex.css";

const Pokedex = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const speciesResponse = await axios.get(response.data.species.url);
			const name = speciesResponse.data.names.find(
				(n) => n.language.name === "fr"
			).name;
			const description = speciesResponse.data.flavor_text_entries.find(
				(t) => t.language.name === "fr"
			).flavor_text;
			const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

			setPokemon({ name, description, image });
		};
		fetchData();
	}, [id]);

	if (!pokemon) {
		return <div>Loading...</div>;
	}

	return (
		<main className="Pokedex">
			<h1>{pokemon.name}</h1>
			<img src={pokemon.image} alt={pokemon.name} />
			<p>{pokemon.description}</p>
		</main>
	);
};

export default Pokedex;
