import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const translateNameToEnglish = async (name) => {
	const response = await axios.post(
		"https://translation.googleapis.com/language/translate/v2",
		{},
		{
			params: {
				q: name,
				target: "en",
				format: "text",
				source: "fr",
				key: "YOUR_API_KEY",
			},
		}
	);
	return response.data.data.translations[0].translatedText;
};

const PokemonDetailsPage = () => {
	const [pokemonDetails, setPokemonDetails] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchPokemonDetails = async () => {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const { name, weight, height, sprites, stats } = response.data;
			const imageUrl = sprites.other["official-artwork"].front_default;
			const imageBackUrl = sprites.other["official-artwork"].back_default;
			const shinyImageUrl = sprites.front_shiny;
			const shinyImageBackUrl = sprites.back_shiny;
			const newPokemonDetails = {
				name,
				id,
				weight,
				height,
				imageUrl,
				imageBackUrl,
				shinyImageUrl,
				shinyImageBackUrl,
				stats,
			};
			setPokemonDetails(newPokemonDetails);
		};
		fetchPokemonDetails();
	}, [id]);

	if (!pokemonDetails) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{pokemonDetails.name}</h1>
			<img src={pokemonDetails.imageUrl} alt={pokemonDetails.name} />
			<h2>Weight: {pokemonDetails.weight} kg</h2>
			<h2>Height: {pokemonDetails.height / 10} m</h2>
			<h2>Stats:</h2>
			<ul>
				{pokemonDetails.stats.map((stat) => (
					<li key={stat.stat.name}>
						{stat.stat.name}: {stat.base_stat}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonDetailsPage;
