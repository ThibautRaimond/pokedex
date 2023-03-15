import { useState } from "react";
import { Link } from "react-router-dom";

import { useSpeciesApi } from "../hooks/usePokeApi";
import { useGeneretions, generations } from "../hooks/useGenerations"
import Loader from "../components/Loader";
import "./HomePage.css";

const HomePage = () => {
	// Déclaration du state "generations" initialisé à un objet avec toutes les générations
	const [generationsState, setGenerationsState] = useState({
		1: true,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
		8: false,
	});

	const selectedGenerations = Object.entries(generationsState)
		.filter(([gen, isSelected]) => isSelected)
		.map(([gen, isSelected]) => gen);

	const genFrom = selectedGenerations.reduce(
		(acc, gen) => Math.min(acc, generations[gen].from),
		Number.MAX_SAFE_INTEGER
	);
	const genTo = selectedGenerations.reduce(
		(acc, gen) => Math.max(acc, generations[gen].to),
		Number.MIN_SAFE_INTEGER
	);

	// Utilisation du hook useSpeciesApi avec les valeurs actuelles de "genFrom" et "genTo"
	const { data, isLoading, isError } = useSpeciesApi({
		from: genFrom,
		to: genTo,
	});

	const handleChangeGeneration = (gen) => {
		setGenerationsState({
			...generationsState,
			[gen]: !generationsState[gen],
		});
	};

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
