import { Link } from "react-router-dom";
import { useSpeciesApi } from "../hooks/usePokeApi";
import Loader from "../components/Loader";
import "./HomePage.css";

const HomePage = () => {
	const { data, isLoading, isError } = useSpeciesApi({ from: 1, to: 151 });

	// Rechercher par nom ou ID:
	// fonction pour que le insert fonctionne sans accents:
	
	// function removeAccents(str) {
	// 	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	// }
	// // on filtre tout les pokemons et réinitialise les accents:
	// const selectedPokemons = pokemonDetails.filter((pokemon) => {
	// 	// sur le pokemon recherché:
	// 	const nameWithoutAccents = removeAccents(pokemon.name.toLowerCase());
	// 	// et dans le input:
	// 	const searchTermWithoutAccents = removeAccents(searchTerm.toLowerCase());
	// 	return (
	// 		nameWithoutAccents.includes(searchTermWithoutAccents) ||
	// 		pokemon.id.toString() === searchTerm
	// 	);
	// });

	return (
		<main className="homePage">
			<div className="generationSelectContainer">
				<label htmlFor="generationText">Génération(s) </label>
			</div>
			<input
				type="text"
				placeholder="Rechercher par nom ou ID"
				// value={searchTerm}
				// on recherche les pokemons (via name & ID) en fonction de la GEN
				// onChange={(event) => setSearchTerm(event.target.value)}
				className="searchPokemon"
			/>

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
