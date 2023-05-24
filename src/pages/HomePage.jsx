import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

import { useSpeciesApi } from "../hooks/usePokeApi";
import { useGenerations } from "../hooks/useGenerations";
import { translateType } from "../locales/types";
import ScrollToTopButton from "../components/Inputs/ScrollToTopButton";
import ScrollToBotButton from "../components/Inputs/ScrollToBotButton";
import PokeballLoader from "../components/Inputs/PokeballLoader";
import CircleLoader from "../components/Inputs/CircleLoader";
import "./HomePage.css";

const HomePage = () => {
	const contentRef = useRef(null);
	
	const [searchQuery, setSearchQuery] = useState("");
	
	const [selectedTypes, setSelectedTypes] = useState([]);
	
	const { generationsState, genFrom, genTo, handleChangeGeneration } =
	useGenerations();
	
	// Utilisation du hook useSpeciesApi avec les valeurs actuelles de "genFrom" et "genTo"
	const { data, isLoading, isError } = useSpeciesApi({
		from: genFrom,
		to: genTo,
	});
	
	const [isOpen, setIsOpen] = useState(false);
	
	const toggleDiv = () => {
		setIsOpen(!isOpen);
	};
	
	const [imageLoading, setImageLoading] = useState(true);
	
	const handleImageLoaded = () => {
		setImageLoading(false);
	};
	
	return (
		<main className="homePage">
		<div ref={contentRef} className="homePageContainer">
		<div className="homePageContainer__filterPokemonContainerWithButton">
		<div
		className={`homePageContainer__filterPokemonContainer ${
			isOpen ? "open" : ""
		}`}
		>
		<h2 className="generationSelectContainer__generationTitle">
		Génération(s):
		</h2>
		<div className="filterPokemonContainer__generationSelectContainer">
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
			
			{/* contenu du toggle: */}
			<h2 className="filterPokemonContainer__typeTitle">Types:</h2>
			<div className="filterPokemonContainer__typeSelectContainer">
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
				<label key={type} className="typeSelectContainer__types">
				<input
				type="checkbox"
				name="typeSelect"
				value={type}
				checked={selectedTypes.includes(type)}
				onChange={(event) => {
					if (event.target.checked) {
						setSelectedTypes([...selectedTypes, type]);
					} else {
						setSelectedTypes(
							selectedTypes.filter((t) => t !== type)
							);
						}
					}}
					/>
					{translateType(type)}
					</label>
					))}
					</div>
					</div>
					{/* partie open/close du toogle: */}
					<div
					className="filterPokemonContainerWithButton__toggleDiv"
					onClick={toggleDiv}
					>
					{isOpen ? (
						<RxCross2 className="toggleDiv__toggler" size={25} />
						) : (
							<RxHamburgerMenu className="toggleDiv__toggler" size={25} />
							)}
							<span className="toggleDiv__openOrCloseFilter">
							{isOpen ? (
								<h3 className="openOrCloseFilter__filterTitle" alt="Fermer le menu qui permet de filtrer les pokemons">
								Fermer le filtre
								</h3>
								) : (
									<h3 className="openOrCloseFilter__filterTitle" alt="Ouvrir le menu afin de filtrer les pokemons">
									Filtrer les pokemons
									</h3>
									)}
									</span>
									</div>
									</div>
									
									<input
									className="homePageContainer__searchPokemonByName"
									type="text"
									placeholder="Nom du pokemon"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									/>
									
									{isLoading && <PokeballLoader />}
									{isError && <p>Erreur</p>}
									{data && (
										<ul
										className={"homePageContainer__pokemonsContainer"}
										id="list-container"
										>
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
															<li
															className={` ${types[0]} pokemonsContainer__pokemonContainer`}
															key={index}
															>
															<Link to={`/pokedex/pokemon/${id}`} alt="Visionner le pokemon dans le">
															<div className="pokemonContainer__NameAndId">
															<p>{name}</p>
															<p>N°{id}</p>
															</div>
															
															{imageLoading && <CircleLoader />}
															<div className="pokemonContainer__imgContainer">
															<img
															src={sprite}
															alt={name}
															onLoad={handleImageLoaded}
															className="imgContainer__PokemonImg"
															/>
															</div>
															</Link>
															</li>
															))}
															</ul>
															)}
															<ScrollToTopButton alt="retourner en haut de la page" />
															<ScrollToBotButton alt="accéder au bas de la page"/>
															</div>
															</main>
															);
														};
														
														export default HomePage;