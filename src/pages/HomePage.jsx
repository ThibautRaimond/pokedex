import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
	const [pokemonList, setPokemonList] = useState([]);

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

	return (
		<div>
			<h1>Pokémon List</h1>
			<ul>
				{pokemonDetails.map((pokemon, index) => (
					<li key={index}>
						<p>Name: {pokemon.name}</p>
						<p>Class(es): </p>
						<ul>
							{pokemon.classes.map((classe, index) => (
								<li key={index}>{classe}</li>
							))}
						</ul>
						<img src={pokemon.image} alt={pokemon.name} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;
