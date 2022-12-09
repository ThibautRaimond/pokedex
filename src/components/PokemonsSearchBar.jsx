import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PokemonSearchBar.css";

const PokemonsSearchBar = () => {
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
	
	const getPokemon = async () => {
		const toArray = [];
		try {
			const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
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

	// const getLanguage = async () => {
	// 	const toArray = [];
	// 	try {
	// 		const url = `https://pokeapi.co/api/v2/language/5`;
	// 		const res = await axios.get(url);
	// 		toArray.push(res.data);
	// 		setLanguage(res.data.language)
	// 			} catch (e){
	// 	}
	// };

	const handleChange = (e) => {
		setPokemon(e.target.value.toLowerCase())
		// setLanguage(e.target.value.toLowerCase())
	};

	const handleSubmit= (e) => {
		e.preventDefault();
		getPokemon();
	};

	return (
			<div className="SearchBarContainer">
				<form className="search" onSubmit={handleSubmit}>
					<label>
						<input type = "text"
						onChange = {handleChange}
						placeholder = "N° ou nom du Pokemon" 
						/>
					</label>
				</form>
				{pokemonData.map((data) => {
					return(
						<div className="pokemonContainer"> 
						<img src={data.sprites["front_default"]} alt="Image du Pokemon" className="pokemonImg"/>
						<ul className="pokemonInformationsContainer">
							<li> {FirstUpperCase(pokemonName)}</li>
							<li>Pokemon N°{pokemonId}</li>
						</ul>
						<ul className="pokemonStatsContainer">
							<li>
								<ul>
							<h3>Type(s):</h3>
							<li className={pokemonType}> {FirstUpperCase(pokemonType)}</li>
							<li className={pokemon2ndType}> {FirstUpperCase(pokemon2ndType)}</li>
								</ul>
							</li>
							<li className="stat">
								Taille: {""}{(data.height / 10)} m
							</li>
							<li className="stat">
								Poid: {(data.weight / 10 )} kg
								</li>
							</ul>
							</div>
					)
				})}
				</div>
				

	);
};

export default PokemonsSearchBar;
