import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loader from '../components/Loader';
import "../styles/pages/homePage.css";


// Compteur de pokemon par génération:
const generationPokemonCount = [151, 251, 386, 493, 649, 721, 809, 898];

const HomePage = () => {
	// permet de rendre reactive la variable generation:
	const [generation, setGeneration] = useState(0);

	// l'index à partir du quel on va chercher les pokemons dans l'API (ici il dépend de la génération choisi):
	// (l'index correspond à " offset" dans la requête)
	const [genIndexForApi, setgenIndexForApi] = useState(0);

	// permet de stocker toutes les infos des pokemons récupérés:
	const [pokemonDetails, setPokemonDetails] = useState([]);

	// chaine de charactère vide qui s'actualise en pokemon celon le input:
	const [searchTerm, setSearchTerm] = useState("");

	// --------------------------------------------------------------------------------

	const fetchData = async () => {
		// compteur avec nombre de pokemon par gen:
		const count = generationPokemonCount[generation];
		// requête vers l'API pour GET les pokemons:
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon-species?limit=${count}&offset=${genIndexForApi}`
		);
		// stock les pokemons de la requête:
		const results = response.data.results;
		// map tout les pokemons en récupèrant leur url dans l'API:
		const promises = results.map((pokemon) => axios.get(pokemon.url));
		// Promise.all() résoud toutes les promesses et stock les données des Pok dans responses:
		const responses = await Promise.all(promises);
		// cette fois Details contient les infos que je souhaite récupérer parmis les pokemons selectionnés:
		const details = await Promise.all(
			responses.map(async (response) => {
				// Requête vers l'API pour le nom en FR:
				const name = response.data.names.find(
					(n) => n.language.name === "fr"
				).name;
				const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`;
				const id = response.data.id;

				// cherche les pokemon celon leur id pour ensuite pour récupérer leur type(s):
				const pokemonResponse = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);
				// stock les types
				const types = pokemonResponse.data.types.map((type) => type.type.name);

				// return le tout pour les réutiliser à souhait:
				return { name, image, id, types };
			})
		);
		// fusionne les deux tableaux en un element setPokemonsDetails pour permette à chaque requête de compléter
		// les nouveaux details des pokemons sans tout reload:
		setPokemonDetails([...pokemonDetails, ...details]);
		// met le chargement des pokemons à false par défaut pour l'utiliser par la suite
		setLoading(false);
	};

	// Loading initialisé en "true" en fonction du statut de la page
	const [loading, setLoading] = useState(true);

	// --------------------------------------------------------------------------------
	// Utilisation de la data:

	// "Intérupteur": attend un évenement pour extraire les generation:
	const handleGenerationChange = (event) => {
		// parseInt transforme l'extraction en nombre entier:
		setGeneration(parseInt(event.target.value));
	};

	// +1GenerationButton: vérifie la position de la generation et en rajoute une:
	const handleClick = () => {
		setgenIndexForApi(
			(generationPosition) =>
				generationPosition + generationPokemonCount[generation]
		);
	};

	// Dès qu'il y a changement demande concernant la génération on met à jour à la data:
	useEffect(() => {
		fetchData();
	}, [genIndexForApi, generation]);

	// fonction pour que le insert fonctionne sans accents:
	function removeAccents(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}
	// on filtre tout les pokemons et réinitialise les accents:
	const selectedPokemons = pokemonDetails.filter((pokemon) => {
		// sur le pokemon recherché:
		const nameWithoutAccents = removeAccents(pokemon.name.toLowerCase());
		// et dans le input:
		const searchTermWithoutAccents = removeAccents(searchTerm.toLowerCase());
		return (
			nameWithoutAccents.includes(searchTermWithoutAccents) ||
			pokemon.id.toString() === searchTerm
		);
	});

	// --------------------------------------------------------------------------------
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
				// on recherche les pokemons (via name & ID) en fonction de la GEN
				onChange={(event) => setSearchTerm(event.target.value)}
				className="searchPokemon"
			/>

			{/* Loader activé au chargement le page*/}
			{loading ? (
				<Loader />
			) : (
				<ul className="pokemons">
					{selectedPokemons.map((pokemon, index) => (
						// On attribue la class correspondante en fonction de l'index du chaque pokemon
						<li className={` ${pokemon.types[0]} pokemon`} key={index}>
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

			{loading ? (
				""
			) : (
				<button onClick={handleClick} className="morePokemonsButton">
					+1 Génération
				</button>
			)}
		</main>
	);
};
export default HomePage;
