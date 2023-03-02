import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/resetCss.css";
import "../styles/homePage.css";

const HomePage = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [pokemonDetails, setPokemonDetails] = useState([]);
	const [offset, setOffset] = useState(0);

	const fetchData = async () => {
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon-species?limit=&offset=${offset}`
		);
		const results = response.data.results;
		const promises = results.map((pokemon) => axios.get(pokemon.url));
		const responses = await Promise.all(promises);
		const details = responses.map((response) => {
			const name = response.data.names.find(
				(n) => n.language.name === "fr"
			).name;
			const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`;
			const id = response.data.id;
			return { name, image, id };
		});
		setPokemonDetails([...pokemonDetails, ...details]);
	};

	useEffect(() => {
		fetchData();
	});

	const filteredPokemonDetails = pokemonDetails.filter((pokemon) => {
		return (
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			pokemon.id.toString() === searchTerm
		);
	});

	return (
		<main className="HomePage">
			<h1>Liste des Pokémon</h1>
			
			<ul className="pokemons">
				{filteredPokemonDetails.map((pokemon, index) => (
					<li className="pokemon" key={index}>
						<Link to={`/pokedex/pokemon/${pokemon.id}`}>
							<p>{pokemon.name}</p>
							<p>N° {pokemon.id}</p>
							<img src={pokemon.image} alt={pokemon.name} />
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
};

export default HomePage;
