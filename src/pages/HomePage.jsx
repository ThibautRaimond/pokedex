import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/resetCss.css"
import "../styles/homePage.css"

const HomePage = () => {
const [pokemonList, setPokemonList] = useState([]);
const [searchTerm, setSearchTerm] = useState(""); // Nouvel état pour stocker le terme de recherche

useEffect(() => {
	axios
		.get("https://pokeapi.co/api/v2/pokemon?limit=151")
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
		const promises = pokemonList.map((pokemon, index) =>
			axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
		);
		const responses = await Promise.all(promises);
		const details = responses.map((response) => {
			const { name, sprites, types } = response.data;
			const classes = types.map((type) => type.type.name);
			return { name, image: sprites.front_default, classes };
		});
		setPokemonDetails(details);
	};
	fetchData();
}, [pokemonList]);

// Nouvelle fonction pour filtrer les Pokémons en fonction du terme de recherche
const filteredPokemonDetails = pokemonDetails.filter((pokemon) => {
	return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
});

return (
	<main>
		<h1>Pokémon List</h1>
		<input
			type="text"
			placeholder="Search by name"
			value={searchTerm}
			onChange={(event) => setSearchTerm(event.target.value)}
		/>
		<ul className="pokemons">
			{filteredPokemonDetails.map((pokemon, index) => (
				<li key={index} className="pokemon">
				<p> {pokemon.name}</p>
				<img src={pokemon.image} alt={pokemon.name} />
					<p>Class(es): </p>
					<ul>
						{pokemon.classes.map((classe, index) => (
							<li key={index}>{classe}</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	</main>
);
};

export default HomePage;