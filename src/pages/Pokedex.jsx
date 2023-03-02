import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import cssPokedex from "../styles/pokedex.css";

const Pokedex = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [pokemonTypes, setPokemonTypes] = useState([]);
	const [pokemonWeight, setPokemonWeight] = useState(null);
	const [pokemonHeight, setPokemonHeight] = useState(null);
	const [pokemonLocation, setPokemonLocation] = useState(null);
	const translateType = (type) => {
		switch (type) {
			case "normal":
				return "Normal";
			case "fire":
				return "Feu";
			case "water":
				return "Eau";
			case "electric":
				return "Électrique";
			case "grass":
				return "Plante";
			case "ice":
				return "Glace";
			case "fighting":
				return "Combat";
			case "poison":
				return "Poison";
			case "ground":
				return "Sol";
			case "flying":
				return "Vol";
			case "psychic":
				return "Psy";
			case "bug":
				return "Insecte";
			case "rock":
				return "Roche";
			case "ghost":
				return "Spectre";
			case "dragon":
				return "Dragon";
			case "dark":
				return "Ténèbres";
			case "steel":
				return "Acier";
			case "fairy":
				return "Fée";
			default:
				return type;
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const speciesResponse = await axios.get(response.data.species.url);
			const name = speciesResponse.data.names.find(
				(n) => n.language.name === "fr"
			).name;
			const description = speciesResponse.data.flavor_text_entries.find(
				(t) => t.language.name === "fr"
			).flavor_text;
			const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
			const backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;

			setPokemon({ name, description, image, backImage });

			const types = response.data.types.map((t) => t.type.name);
			setPokemonTypes(types);

			const weight = response.data.weight;
			setPokemonWeight(weight);

			const height = response.data.height;
			setPokemonHeight(height);

			const locationResponse = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}/encounters`
			);
			const locations = locationResponse.data.map((l) => l.location_area.name);
			setPokemonLocation(locations);
		};
		fetchData();
	}, [id]);

	if (!pokemon) {
		return <div>Loading...</div>;
	}

	return (
		<main className="pokedexContainer">
			<div id="pokedex">
				<div id="left">
					<div id="logo"></div>
					<div id="bg_curve1_left"></div>
					<div id="bg_curve2_left"></div>
					<div id="curve1_left">
						<div id="buttonGlass">
							<div id="reflect"> </div>
						</div>
						<div id="miniButtonGlass1"></div>
						<div id="miniButtonGlass2"></div>
						<div id="miniButtonGlass3"></div>
					</div>
					<div id="curve2_left">
						<div id="junction">
							<div id="junction1"></div>
							<div id="junction2"></div>
						</div>
					</div>
					<div id="screen">
						<div id="topPicture">
							<div id="buttontopPicture1"></div>
							<div id="buttontopPicture2"></div>
						</div>
						<div id="whiteContainer">
							<div id="pictureDiv">
								<img
									className="picture"
									src={pokemon.image}
									alt={pokemon.name}
								/>
								<img
									className="picture"
									src={pokemon.backImage}
									alt={`${pokemon.name} dos`}
								/>
							</div>
							<div id="pokemonInfoDiv">
								<p id="pokemonInfo">{pokemon.name} Pokemon N°</p>
								<p id="pokemonInfo">{id}</p>
							</div>
						</div>
						<div id="buttonbottomPicture"></div>
						<div id="speakers">
							<div className="sp"></div>
							<div className="sp"></div>
							<div className="sp"></div>
							<div className="sp"></div>
						</div>
					</div>
					<div id="bigbluebutton"></div>
					<div id="barbutton1"></div>
					<div id="barbutton2"></div>
					<div id="cross">
						<div id="leftcross">
							<div id="leftT"></div>
						</div>
						<div id="topcross">
							<div id="upT"></div>
						</div>
						<div id="rightcross">
							<div id="rightT"></div>
						</div>
						<div id="midcross">
							<div id="midCircle"></div>
						</div>
						<div id="botcross">
							<div id="downT"></div>
						</div>
					</div>
				</div>
				<div id="right">
					<div id="stats">
						<div className="pokemonTypes">
							<div>
								<p>
									Types :{" "}
									{pokemonTypes.map((type) => (
										<span>{translateType(type)} </span>
									))}
								</p>
								{/* Autres éléments de votre composant */}
							</div>
						</div>
						<div className="flex">
							Poids: {pokemonWeight / 10} {"  kg"}
						</div>
						<div className="flex">Taille: {pokemonHeight / 10} m</div>
						<h2 className=" description">Description:</h2>
						<p>{pokemon.description}</p>
						{/* <div className="">
							<h2>Localisations: </h2>
							{pokemon.locations &&
								pokemon.locations.map((location) => location.name).join(", ")}
						</div> */}
					</div>

					<div id="blueButtons1">
						<div className="blueButton"></div>
						<div className="blueButton"></div>
						<div className="blueButton"></div>
						<div className="blueButton"></div>
						<div className="blueButton"></div>
					</div>
					<div id="blueButtons2">
						<div className="blueButton"></div>
						<div className="blueButton"></div>
						<div className="blueButton"></div>
						<div className="blueButton"></div>
						<div className="blueButton"></div>
					</div>
					<div id="miniButtonGlass4"></div>
					<div id="miniButtonGlass5"></div>
					<div id="barbutton3"></div>
					<div id="barbutton4"></div>
					<div id="yellowBox1"></div>
					<div id="yellowBox2"></div>
					<div id="bg_curve1_right"></div>
					<div id="bg_curve2_right"></div>
					<div id="curve1_right"></div>
					<div id="curve2_right"></div>
				</div>
			</div>
		</main>
	);
};

export default Pokedex;
