import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import cssPokedex from "../styles/pokedex.css";

const Pokedex = () => {
	const { id } = useParams(); // récupère l'ID du Pokemon à partir de l'URL
	
	const [pokemon, setPokemon] = useState({
		name: "",
		id: "",
		image: "",
		imageBack: "",
		weight: "",
		height: "",
		types: [],
		description: "",
		locations: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`,
				{ params: { language: "fr" } }
			);
			const data = response.data;

			const speciesResponse = await axios.get(data.species.url);
			const speciesData = speciesResponse.data;

			const description = speciesData.flavor_text_entries.find(
				(entry) => entry.language.name === "fr"
			).flavor_text;

			const locationsResponse = await axios.get(data.location_area_encounters);
			const locationsData = locationsResponse.data;

			const locations = locationsData.map((location) => ({
				name: location.location_area.name,
				url: location.location_area.url,
			}));

			setPokemon({
				name: data.name,
				id: data.id,
				image: data.sprites.front_default,
				imageBack: data.sprites.back_default,
				weight: data.weight,
				height: data.height,
				types: data.types,
				description: description,
				locations: locations,
			});
		};
		fetchData();
	}, [id]);

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
								<img id="picture" src={pokemon.image} alt={pokemon.name} />
								<img
									id="picture"
									src={pokemon.imageBack}
									alt={`${pokemon.name} dos`}
								/>
							</div>
							<div id="pokemonInfoDiv">
								<p id="pokemonInfo">{pokemon.name} Pokemon N°</p>
								<p id="pokemonInfo">{pokemon.id}</p>
							</div>
						</div>
						<div id="buttonbottomPicture"></div>
						<div id="speakers">
							<div class="sp"></div>
							<div class="sp"></div>
							<div class="sp"></div>
							<div class="sp"></div>
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
						<div className="">
							<h2>Type(s):</h2>
							{pokemon.types &&
								pokemon.types.map((type, index) => (
									<span key={index}>
										{`${type.type.name}${
											index === pokemon.types.length - 1 ? "" : ", "
										}`}
									</span>
								))}
						</div>
						<div className="flex">
							Poids: {pokemon.weight / 10} {"  kg"}
						</div>
						<div className="flex">
						Taille: {pokemon.height / 10} m
						</div>
						<h2 className=" description">Description:</h2>
						<p>{pokemon.description}</p>
						{/* <div className="">
							<h2>Localisations: </h2>
							{pokemon.locations &&
								pokemon.locations.map((location) => location.name).join(", ")}
						</div> */}
					</div>

					<div id="blueButtons1">
						<div class="blueButton"></div>
						<div class="blueButton"></div>
						<div class="blueButton"></div>
						<div class="blueButton"></div>
						<div class="blueButton"></div>
					</div>
					<div id="blueButtons2">
						<div class="blueButton"></div>
						<div class="blueButton"></div>
						<div class="blueButton"></div>
						<div class="blueButton"></div>
						<div class="blueButton"></div>
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
