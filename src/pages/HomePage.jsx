import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/resetCss.css";
import "../styles/pages/homePage.css";
import "../styles/loader.css";

const generationPokemonCount = [151, 251, 386, 493, 649, 721, 809, 898];
const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [pokemonDetails, setPokemonDetails] = useState([]);
	const [offset, setOffset] = useState(0);
	const [generation, setGeneration] = useState(0);

	const handleGenerationChange = (event) => {
		setGeneration(parseInt(event.target.value));
	};

	const handleClick = () => {
		setOffset((prevOffset) => prevOffset + generationPokemonCount[generation]);
	};

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
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [offset, generation]);

	function removeAccents(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}
	const filteredPokemonDetails = pokemonDetails.filter((pokemon) => {
		const nameWithoutAccents = removeAccents(pokemon.name.toLowerCase());
		const searchTermWithoutAccents = removeAccents(searchTerm.toLowerCase());
		return (
			nameWithoutAccents.includes(searchTermWithoutAccents) ||
			pokemon.id.toString() === searchTerm
		);
	});

	return (
		<main className="homePage">
			<div className="generationSelectContainer">
				<label htmlFor="generationText">Génération(s) </label>
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

			{loading ? (
				<div className="loader">
					<p className="loaderText">Chargement des pokemons</p>
					<div class="lds-facebook">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<ul className="pokemons">
					{filteredPokemonDetails.map((pokemon, index) => (
						<li className={` ${pokemon.types[0]} pokemon`} key={index}>
							<span className="left"></span>
							<span className="right"></span>

							<Link to={`/pokedex/pokemon/${pokemon.id}`}>
								<div className="NameAndId">
									<p>{pokemon.name}</p>
									<p>N°{pokemon.id}</p>
								</div>
								<img src={pokemon.image} alt={pokemon.name} />
							</Link>
						</li>
					))}
				</ul>
			)}

			<button onClick={handleClick} className="morePokemonsButton">
				+1 Génération
			</button>
		</main>
	);
};
export default HomePage;
