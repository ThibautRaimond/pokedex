import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { translateType, getTypeClassName } from "../locales/types";
import "./PokedexPage.css";
import "../styles/pokemonTypes.css";
import pokedexModel from "../assets/pokedexModel.png"

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
			<div className="pokedexPageContainer">
				<img src={pokedexModel} alt="pokedex" />
				<div className="pokedexPageContainer__imgContainer">
					<img
						className="imgContainer__img"
						src={pokemon.image}
						alt={pokemon.name}
					/>
					{/* <img
						className="imgContainer__img"
						src={pokemon.backImage}
						alt={`${pokemon.name} dos`}
					/> */}
				</div>
				<div className="pokedexPageContainer__nameAndIdContainer">
					<h2 className="nameAndIdContainer__pokemonName">{pokemon.name}</h2>
					<h2 className="nameAndIdContainer__pokemonId">Pokemon N°{id}</h2>
				</div>
				<div className="pokedexPageContainer__typesContainer">
					<h2 className="typesContainer__typesTitle">Type(s): </h2>
					{pokemonTypes.map((type) => (
						<span
							className={`${getTypeClassName(type)} pokedexType`}
							key={type}
						>
							{translateType(type)}
						</span>
					))}
				</div>

				<div className="pokedexPageContainer__weightAndHeightContainer">
					<div className="pokedexPageContainer__weightContainer">
						<h2 className="weightContainer__weightTitle">Poids: </h2>
						<p className="weightContainer__weight">{pokemonWeight / 10} kg </p>
					</div>
					<div className="pokedexPageContainer__heightContainer">
						<h2 className="heightContainer__heightTitle">Taille: </h2>
						<p className="heightContainer__height">{pokemonHeight / 10} m</p>
					</div>
				</div>

				<div className="pokedexPageContainer____categoryContainer">
					<h2 className="categoryContainer__categoryTitle">Catégorie:</h2>
					<p className="categoryContainer__category">{pokemonCategory}</p>
				</div>

				{/* <div className="pokedexPageContainer____genderContainer">
					<h2 className="genderContainer__genderTitle">Genre(s):</h2>
					<p className="genderContainer__gender">
						{pokemonGenders.length === 2
							? pokemonGenders.join(" & ")
							: pokemonGenders}
					</p>
				</div> */}

				<div className="pokedexPageContainer____descriptionContainer">
					<h2 className="descriptionContainer__descriptionTitle">Description:</h2>
				<p className="descriptionContainer__descriptionText">{pokemon.description}</p>
				</div>
			</div>
		);
	}
};
export default PokedexPage;
