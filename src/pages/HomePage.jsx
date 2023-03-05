import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/resetCss.css";
import "../styles/pages/homePage.css";

const generationPokemonCount = [151, 251, 386, 493, 649, 721, 809, 898];

const HomePage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [pokemonDetails, setPokemonDetails] = useState([]);
	const [offset, setOffset] = useState(0);
	const [generation, setGeneration] = useState(0);

	const fetchData = async () => {
		const count = generationPokemonCount[generation];
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon-species?limit=${count}&offset=${offset}`
		);
		const results = response.data.results;
		const promises = results.map((pokemon) => axios.get(pokemon.url));
		const responses = await Promise.all(promises);
		const details = await Promise.all(
			responses.map(async (response) => {
				const name = response.data.names.find(
					(n) => n.language.name === "fr"
				).name;
				const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`;
				const id = response.data.id;
				const pokemonResponse = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);
				const types = pokemonResponse.data.types.map((type) => type.type.name);
				return { name, image, id, types };
			})
		);
		setPokemonDetails([...pokemonDetails, ...details]);
	};

	useEffect(() => {
		fetchData();
	}, [offset, generation]);

	const filteredPokemonDetails = pokemonDetails.filter((pokemon) => {
		return (
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			pokemon.id.toString() === searchTerm
		);
	});

	const handleGenerationChange = (event) => {
		const selectedGeneration = parseInt(event.target.value);
		setGeneration(selectedGeneration);
		setOffset(0);
		setPokemonDetails([]);
	};

	const handleClick = () => {
		const newGeneration = generation + 1;
		if (newGeneration < generationPokemonCount.length) {
			setGeneration(newGeneration);
			setOffset(0);
			setPokemonDetails([]);
		}
	};

	return (
		<main className="homePage">
			<div className="generation-select">
				<label htmlFor="generationText">Sélectionner une génération </label>
				<select
					className="generationSelect"
					value={generation}
					onChange={handleGenerationChange}
				>
					{generationPokemonCount.map((count, index) => (
						<option key={index} value={index}>
							{index + 1}
						</option>
					))}
				</select>
			</div>
			<input
				type="text"
				placeholder="Rechercher par nom ou ID"
				value={searchTerm}
				onChange={(event) => setSearchTerm(event.target.value)}
				className="searchPokemon"
			/>
			<ul className="pokemons">
				{filteredPokemonDetails.map((pokemon, index) => (
					<li className={`pokemon ${pokemon.types[0]}`} key={index}>
					<span className="left"></span>
					<span className="right"></span>
				
						<Link to={`/pokedex/pokemon/${pokemon.id}`}>
							<div className="NameAndId">
							<p >{pokemon.name}</p>
							<p>N° {pokemon.id}</p>
							</div>
							<img src={pokemon.image} alt={pokemon.name} />
						</Link>
					</li>
				))}
			</ul>

			<button onClick={handleClick} className="morePokemonsButton">
				+1 Génération
			</button>
		</main>
	);
};
export default HomePage;
