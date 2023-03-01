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
		<main>
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
		</main>
	);
};

export default Pokedex;
