import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar"
import "../styles/pages/pokedexPage.css";
import "../styles/pokemonTypes.css";

const PokedexPage = () => {
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

	const getTypeClassName = (type) => {
		switch (type) {
			case "normal":
				return "normal";
			case "fire":
				return "fire";
			case "water":
				return "water";
			case "electric":
				return "electric";
			case "grass":
				return "grass";
			case "ice":
				return "ice";
			case "fighting":
				return "fighting";
			case "poison":
				return "poison";
			case "ground":
				return "ground";
			case "flying":
				return "flying";
			case "psychic":
				return "psychic";
			case "bug":
				return "bug";
			case "rock":
				return "rock";
			case "ghost":
				return "ghost";
			case "dragon":
				return "dragon";
			case "dark":
				return "dark";
			case "steel":
				return "steel";
			case "fairy":
				return "fairy";
			default:
				return "type";
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
		<main className="pokedexPage">
			<Navbar />
			<div className="pokedexContainer">
				<div className="pokedex">
					<div className="left">
						<div className="logo"></div>
						<div className="bg_curve1_left"></div>
						<div className="bg_curve2_left"></div>
						<div className="curve1_left">
							<div className="buttonGlass">
								<div className="reflect"> </div>
							</div>
							<div className="miniButtonGlass1"></div>
							<div className="miniButtonGlass2"></div>
							<div className="miniButtonGlass3"></div>
						</div>
						<div className="curve2_left">
							<div className="junction">
								<div className="junction1"></div>
								<div className="junction2"></div>
							</div>
						</div>
						<div className="screen">
							<div className="topPicture">
								<div className="buttontopPicture1"></div>
								<div className="buttontopPicture2"></div>
							</div>
							<div className="whiteContainer">
								<div className="pictureDiv">
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
								<div className="pokemonInfoDiv">
									<p className="pokemonInfo">{pokemon.name} Pokemon N°</p>
									<p className="pokemonInfo">{id}</p>
								</div>
							</div>
							<div className="buttonbottomPicture"></div>
							<div className="speakers">
								<div className="sp"></div>
								<div className="sp"></div>
								<div className="sp"></div>
								<div className="sp"></div>
							</div>
						</div>
						<div className="bigbluebutton"></div>
						<div className="barbutton1"></div>
						<div className="barbutton2"></div>
						<div className="cross">
							<div className="leftcross">
								<div className="leftT"></div>
							</div>
							<div className="topcross">
								<div className="upT"></div>
							</div>
							<div className="rightcross">
								<div className="rightT"></div>
							</div>
							<div className="mclassNamecross">
								<div className="mclassNameCircle"></div>
							</div>
							<div className="botcross">
								<div className="downT"></div>
							</div>
						</div>
					</div>
					<div className="right">
						<div className="stats">
							<div className="pokemonTypes">
								<div>
									<p>
										Types :{" "}
										{pokemonTypes.map((type) => (
											<span className={getTypeClassName(type)}>
												{translateType(type)}{" "}
											</span>
										))}
									</p>
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

						<div className="blueButtons1">
							<div className="blueButton"></div>
							<div className="blueButton"></div>
							<div className="blueButton"></div>
							<div className="blueButton"></div>
							<div className="blueButton"></div>
						</div>
						<div className="blueButtons2">
							<div className="blueButton"></div>
							<div className="blueButton"></div>
							<div className="blueButton"></div>
							<div className="blueButton"></div>
							<div className="blueButton"></div>
						</div>
						<div className="miniButtonGlass4"></div>
						<div className="miniButtonGlass5"></div>
						<div className="barbutton3"></div>
						<div className="barbutton4"></div>
						<div className="yellowBox1"></div>
						<div className="yellowBox2"></div>
						<div className="bg_curve1_right"></div>
						<div className="bg_curve2_right"></div>
						<div className="curve1_right"></div>
						<div className="curve2_right"></div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PokedexPage;
