import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { translateType, getTypeClassName } from '../components/functionsForType';
import "../styles/pages/pokedexPage.css";
import "../styles/pokemonTypes.css";

const PokedexPage = () => {
	// useParams récupère l'id présent dans l'URL
	const { id } = useParams();
	// toutes les infos des pokemons qu'on va pouvoir render:
	const [pokemon, setPokemon] = useState(null);
	const [pokemonTypes, setPokemonTypes] = useState([]);
	const [pokemonWeight, setPokemonWeight] = useState(null);
	const [pokemonHeight, setPokemonHeight] = useState(null);
	const [pokemonCategory, setPokemonCategory] = useState(null);
	const [pokemonGenders, setPokemonGenders] = useState([]);

	useEffect(() => {
		// on selectionne la data du pokemon concerné grace au id récupéré dans l'url:
		const fetchData = async () => {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const speciesUrl = response.data.species.url;
			const speciesResponse = await axios.get(speciesUrl);

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

			const category = speciesResponse.data.genera.find(
				(g) => g.language.name === "fr"
			).genus;
			setPokemonCategory(category);

			const genders = speciesResponse.data.gender_rate;
			if (genders === -1) {
				setPokemonGenders(["Non genré"]);
			} else if (genders === 0) {
				setPokemonGenders(["Mâle"]);
			} else if (genders === 8) {
				setPokemonGenders(["Femelle"]);
			} else {
				setPokemonGenders(["Mâle", "Femelle"]);
			}
		};

		fetchData();
	}, [id]);
	if (pokemon) {
		return (
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

						<div className="greyContainer">
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
								<h2 className="pokemonName">{pokemon.name}</h2>
								<h2 className="pokemonId">Pokemon N°{id}</h2>

								<p className="typesContainer">
									<h2 className="typesH2">Type(s): </h2>
									{pokemonTypes
										.map((type) => (
											<span className={`${getTypeClassName(type)} pokedexType`}>
												{translateType(type)}
											</span>
										))
										.reduce((prev, curr) => [prev, " ", curr])}
								</p>
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
						<div className="weightHeightDiv">
							<div className="weightDiv">
								<h2 className="weightH2">Poids: </h2>
								{pokemonWeight / 10} kg
							</div>
							<div className="heightDiv">
								<h2 className="heightH2">Taille: </h2>
								{pokemonHeight / 10} m
							</div>
						</div>
						<div className="categoryContainer">
							<h2 className="categoryH2">Catégorie:</h2>
							<p> {pokemonCategory}</p>
						</div>

						<div className="genderContainer">
							<h2 className="genderH2">Genre(s):</h2>
							<p>
								{pokemonGenders.length === 2
									? pokemonGenders.join(" & ")
									: pokemonGenders}
							</p>
						</div>

						<h2 className=" description">Description:</h2>
						<p>{pokemon.description}</p>
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
		);
	}
};
export default PokedexPage;
