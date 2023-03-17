import { useState } from "react";
import { Link } from "react-router-dom";

import { useSpeciesApi } from "../hooks/usePokeApi";
import { useGenerations } from "../hooks/useGenerations";
import { translateType } from "../locales/types";
import Loader from "../components/Loader";
import "./HomePage.css";

const HomePage = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const [selectedTypes, setSelectedTypes] = useState([]);

	const {
		generationsState,
		genFrom,
		genTo,
		handleChangeGeneration,
	} = useGenerations();

	// Utilisation du hook useSpeciesApi avec les valeurs actuelles de "genFrom" et "genTo"
	const { data, isLoading, isError } = useSpeciesApi({
		from: genFrom,
		to: genTo,
	});

	return (
		<main className="homePage">
			<div className="generationSelectContainer">
				<label htmlFor="generationText">Générations </label>
				{Object.entries(generationsState).map(([gen, isSelected]) => (
					<label key={gen} htmlFor={gen}>
						<input
							type="checkbox"
							name={gen}
							id={gen}
							checked={isSelected}
							onChange={() => handleChangeGeneration(gen)}
						/>
						{gen.toUpperCase()}{" "}
					</label>
				))}
			</div>

			<div className="typeSelectContainer">
				<label htmlFor="typeSelect"></label>
				{[
					"normal",
					"fighting",
					"flying",
					"poison",
					"ground",
					"rock",
					"bug",
					"ghost",
					"steel",
					"fire",
					"water",
					"grass",
					"electric",
					"psychic",
					"ice",
					"dragon",
					"dark",
					"fairy",
				].map((type) => (
					<label key={type}>
						<input
							type="checkbox"
							name="typeSelect"
							value={type}
							checked={selectedTypes.includes(type)}
							onChange={(event) => {
								if (event.target.checked) {
									setSelectedTypes([...selectedTypes, type]);
								} else {
									setSelectedTypes(selectedTypes.filter((t) => t !== type));
								}
							}}
						/>
						{translateType(type)}
					</label>
				))}
			</div>

			<div className="searchPokemonContainer">
				<input
				className="searchPokemon"
					type="text"
					placeholder="Rechercher un Pokémon..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{isLoading && <Loader />}
			{isError && <p>Dommage...</p>}
			{data && (
				<ul className={"pokemons"}>
					{data
						.filter(
							({ name, types }) =>
								name
									.toLowerCase()
									.normalize("NFD")
									.replace(/[\u0300-\u036f]/g, "") // supprime les accents
									.includes(
										searchQuery
											.toLowerCase()
											.normalize("NFD")
											.replace(/[\u0300-\u036f]/g, "")
									) &&
								(selectedTypes.length > 0
									? types.some((t) => selectedTypes.includes(t))
									: true)
						)
						.map(({ id, name, types, sprite }, index) => (
							// On attribue la class correspondante en fonction de l'index du chaque pokemon
							<li className={` ${types[0]} pokemon`} key={index}>
								<Link to={`/pokedex/pokemon/${id}`}>
									<div className="NameAndId">
										<p>{name}</p>
										<p>N°{id}</p>
									</div>
									<img src={sprite} alt={name} />
								</Link>
							</li>
						))}
				</ul>
			)}
		</main>
	);
};

export default HomePage;
