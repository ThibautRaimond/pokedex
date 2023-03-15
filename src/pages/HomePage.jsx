import { useState } from "react";
import { Link } from "react-router-dom";

import { useSpeciesApi } from "../hooks/usePokeApi";
import { useGenerations } from "../hooks/useGenerations";
import Loader from "../components/Loader";
import "./HomePage.css";

const HomePage = () => {
	const {
		generationsState,
		selectedGenerations,
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

			{isLoading && <Loader />}
			{isError && <p>Dommage...</p>}
			{data && (
				<ul className={"pokemons"}>
					{data.map(({ id, name, types, sprite }, index) => (
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
