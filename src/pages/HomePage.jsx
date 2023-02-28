import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/resetCss.css";
import "../styles/homePage.css";

const HomePage = () => {
const [pokemonList, setPokemonList] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
	axios
		.get("https://pokeapi.co/api/v2/pokemon-species?limit=151")
		.then((response) => {
			setPokemonList(response.data.results);
		})
		.catch((error) => {
			console.log(error);
		});
}, []);

const [pokemonDetails, setPokemonDetails] = useState([]);

useEffect(() => {
	const fetchData = async () => {
		const promises = pokemonList.map((pokemon) =>
			axios.get(pokemon.url)
		);
		const responses = await Promise.all(promises);
		const details = responses.map((response) => {
			const name = response.data.names.find((n) => n.language.name === "fr").name;
			const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`;
			return { name, image};
		});
		setPokemonDetails(details);
	};
	fetchData();
}, [pokemonList]);

const filteredPokemonDetails = pokemonDetails.filter((pokemon) => {
	return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
});

return (
	<main>
		<h1>Liste des Pokémon</h1>
		<input
			type="text"
			placeholder="Rechercher par nom"
			value={searchTerm}
			onChange={(event) => setSearchTerm(event.target.value)}
		/>
		<ul className="pokemons">
			{filteredPokemonDetails.map((pokemon, index) => (
				<li className="pokemon" key={index}>
					<p>{pokemon.name}</p>
						<img src={pokemon.image} alt={pokemon.name} />

				</li>
			))}
		</ul>
	</main>
);
};

export default HomePage;