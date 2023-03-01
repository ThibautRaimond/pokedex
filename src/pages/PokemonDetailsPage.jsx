import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonDetailsPage = () => {
	const { id } = useParams(); // récupère l'ID du Pokemon à partir de l'URL
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`,
				{ params: { language: "fr" } }
			);
			const data = response.data;

			setPokemon({
				name: data.name,
				id: data.id,
				image: data.sprites.front_default,
				imageBack: data.sprites.back_default,
				weight: data.weight,
				height: data.height,
				types: data.types,
			});
		};
		fetchData();
	}, [id]);

	return (
		<div>
			<h1>Détails du Pokémon</h1>
			<p>Nom : {pokemon.name}</p>
			<p>ID : {pokemon.id}</p>
			<div>
				<img src={pokemon.image} alt={pokemon.name} />
				<img src={pokemon.imageBack} alt={`${pokemon.name} dos`} />
			</div>
			<div>
				Type(s):{" "}
				{pokemon.types &&
					pokemon.types.map((type, index) => (
						<span key={index}>
							{`${type.type.name}${
								index === pokemon.types.length - 1 ? "" : ", "
							}`}
						</span>
					))}
			</div>
			<div>Poids: {pokemon.weight / 10} kg</div>
			<div>Taille: {pokemon.height / 10} m</div>
		</div>
	);
};

export default PokemonDetailsPage;
