import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { translateType } from "../locales/types";
import "./PokedexPage.css";
import "../styles/pokemonTypes.css";
import pokedexModel from "../assets/pokedexModel.png";

const PokedexPage = () => {
  // useParams récupère l'id présent dans l'URL
  const { id } = useParams();
  const currentId = Number(id);
  const MIN = 1;
  const [maxPokemon, setMaxPokemon] = useState(null);
  // toutes les infos des pokemons qu'on va pouvoir render:
  const [pokemon, setPokemon] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonWeight, setPokemonWeight] = useState(null);
  const [pokemonHeight, setPokemonHeight] = useState(null);
  const [pokemonCategory, setPokemonCategory] = useState(null);

  useEffect(() => {
    // Récupérer le nombre total de Pokémon
    const fetchMaxPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon-species/?limit=1"
        );
        setMaxPokemon(response.data.count);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre max de Pokémon:", error);
      }
    };
    fetchMaxPokemon();
  }, []);

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

      const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
        (t) => t.language.name === "fr"
      );
      const description = descriptionEntry
        ? descriptionEntry.flavor_text
        : "Description indisponible.";

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
    };

    fetchData();
  }, [id]);
  if (pokemon) {
    return (
      <div className="pokedexPageContainer">
        <Helmet>
          <title>{pokemon.name} - Pokedex</title>
        </Helmet>
        <img src={pokedexModel} alt="" />
        <div className="pokedexPageContainer__imgContainer">
          <img
            className="imgContainer__img"
            src={pokemon.image}
            alt={pokemon.name}
            aria-hidden="true"
          />
          {/* <img
						className="imgContainer__img"
						src={pokemon.backImage}
						alt={`${pokemon.name} dos`}
						aria-hidden="true"
					/> */}
        </div>
        <div className="pokedexPageContainer__nameAndIdContainer">
          <h2 className="nameAndIdContainer__pokemonName">{pokemon.name}</h2>
          <div className="arrowAndIdContainer">
            {currentId > MIN ? (
              <Link
                to={`/pokedex/pokemon/${currentId - 1}`}
                className="arrow"
                aria-label="Pokemon précédent"
              >
                ◀
              </Link>
            ) : (
              <span className="arrow disabled">ᐊ</span>
            )}

            <p className="nameAndIdContainer__pokemonId">
              Pokemon N°{currentId}
            </p>

            {currentId < maxPokemon ? (
              <Link
                to={`/pokedex/pokemon/${currentId + 1}`}
                className="arrow"
                aria-label="Pokemon suivant"
              >
                ▶
              </Link>
            ) : (
              <span className="arrow disabled">ᐅ</span>
            )}
          </div>
        </div>

        <ul className="pokedexPageContainer">
          <li className="pokedexPageContainer__typesContainer">
            <p className="typesContainer__typesTitle">
              Type<span aria-hidden="true">(s)</span> :
            </p>
            {pokemonTypes.map((type) => (
              <span className="typesContainer__pokedexType" key={type}>
                {translateType(type)}
              </span>
            ))}
          </li>

          <li className="pokedexPageContainer__weightAndHeightContainer">
            <div className="pokedexPageContainer__weightContainer">
              <p className="weightContainer__weightTitle">Poids : </p>
              <p className="weightContainer__weight">
                {pokemonWeight / 10} kg{" "}
              </p>
            </div>
            <div className="pokedexPageContainer__heightContainer">
              <p className="heightContainer__heightTitle">Taille : </p>
              <p className="heightContainer__height">{pokemonHeight / 10} m</p>
            </div>
          </li>

          <li className="pokedexPageContainer____categoryContainer">
            <p className="categoryContainer__categoryTitle">Catégorie :</p>
            <p className="categoryContainer__category">{pokemonCategory}</p>
          </li>

          {/* <li className="pokedexPageContainer____genderContainer">
					<p className="genderContainer__genderTitle">Genre(s):</p>
					<p className="genderContainer__gender">
						{pokemonGenders.length === 2
							? pokemonGenders.join(" & ")
							: pokemonGenders}
					</p>
				</li> */}

          <li className="pokedexPageContainer____descriptionContainer">
            <p className="descriptionContainer__descriptionTitle">
              Description :
            </p>
            <p className="descriptionContainer__descriptionText">
              {pokemon.description}
            </p>
          </li>
        </ul>
      </div>
    );
  }
};
export default PokedexPage;
