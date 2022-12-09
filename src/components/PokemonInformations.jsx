import React, { useState} from "react";
import axios from "axios";

const PokemonInformations = () => {

	const [pokemon, setPokemon] = useState();
	const [pokemonName, setPokemonName] = useState("");
	const [pokemonId, setPokemonId] = useState("");
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonType, setPokemonType] = useState("");
	const [pokemon2ndType, setPokemon2ndType] = useState("");
	
	const getPokemon = async () => {
		const toArray = [];
		try {
			const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
			const res = await axios.get(url);
			toArray.push(res.data);
			setPokemonName(res.data.name);
			setPokemonId(res.data.id)
			setPokemonType(res.data.types[0].type.name);
			setPokemonData(toArray);
			if (setPokemon2ndType(res.data.types[1].type.name) !== 'undefined'){
				setPokemon2ndType(res.data.types[1].type.name);
			};
		} catch (e){}
	};
};

export default PokemonInformations;