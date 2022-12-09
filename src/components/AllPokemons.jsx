import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PokemonSearchBar.css";

const AllPokemons = () => {
	const [pokemon, setPokemon] = useState();
	const [pokemonName, setPokemonName] = useState("");
	const [pokemonId, setPokemonId] = useState("");
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonType, setPokemonType] = useState("");
	const [pokemon2ndType, setPokemon2ndType] = useState("");
	// const [language, setLanguage] = useState("")

	function FirstUpperCase(word){
		return word[0].toUpperCase() + word.substring(1)
	};
	
	const getAllPokemons = async () => {
		const toArray = [];
		try {
			const url = `https://pokeapi.co/api/v2/pokemon/`
			const res = await axios.get(url);
			toArray.push(res.data);
			setPokemonName(res.data.name);
			setPokemonId(res.data.id)
			setPokemonType(res.data.types[0].type.name);
			setPokemonData(toArray);
			if (setPokemon2ndType(res.data.types[1].type.name) !== 'undefined'){
				setPokemon2ndType(res.data.types[1].type.name);
			};
		} catch (e){
		}
	};

	const handleChange = (e) => {
		setPokemon(e.target.value.toLowerCase())
	};

	const handleSubmit= (e) => {
		e.preventDefault();
		getAllPokemons();
	};

	return (
			<div>
				<p>coucou</p>
			</div>
	);
};

export default AllPokemons.jsx;
