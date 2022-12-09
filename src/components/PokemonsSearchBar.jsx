import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PokemonSearchBar.css"

const PokemonsSearchBar = () => {
	const [pokemon, setPokemon] = useState();
	const [pokemonName, setPokemonName] = useState("");
	const [pokemonId, setPokemonId] = useState("");
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonType, setPokemonType] = useState("");

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
			console.log(res)
		} catch (e){
			console.log(e)
		}
	};

	const handleChange = (e) => {
		setPokemon(e.target.value.toLowerCase())
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
						<ul>
							<li>{pokemonName}</li>
							<li>Pokemon N°{pokemonId}</li>
						</ul>
						<div className="pokemonStatsContainer">				
							<div className="stat">
								<p className="type">Type: {pokemonType}</p>
								</div>
							<div className="stat">
								Taille: {""}{Math.round(data.height * 3.9)}
							</div>
							<div className="stat">
								Poid: {Math.round(data.weight / 4.3)} lbs
								</div>
							
							</div>
							</div>
					)
				})}
				</div>
	);
};

export default PokemonsSearchBar;
