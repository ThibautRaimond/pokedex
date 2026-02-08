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
          "https://pokeapi.co/api/v2/pokemon-species/?limit=1",
        );
        setMaxPokemon(response.data.count);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre max de Pokémon:",
          error,
        );
      }
    };
    fetchMaxPokemon();
  }, []);

  useEffect(() => {
    // on selectionne la data du pokemon concerné grace au id récupéré dans l'url:
    const fetchData = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );
      const speciesUrl = response.data.species.url;
      const speciesResponse = await axios.get(speciesUrl);

      const name = speciesResponse.data.names.find(
        (n) => n.language.name === "fr",
      ).name;

      const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
        (t) => t.language.name === "fr",
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
        (g) => g.language.name === "fr",
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
        <div className="pokedexPageContainerImgContainer">
          <img
            className="imgContainerImg"
            src={pokemon.image}
            alt={pokemon.name}
            aria-hidden="true"
          />
          {/* <img
						className="imgContainerImg"
						src={pokemon.backImage}
						alt={`${pokemon.name} dos`}
						aria-hidden="true"
            
					/> */}
        </div>
        <div className="pokedexPageContainerNameAndIdContainer">
          <h1
            className="nameAndIdContainerPokemonName skipTarget"
            tabIndex="-1"
          >
            {pokemon.name}
          </h1>
          <div className="arrowAndIdContainer">
            {currentId > MIN ? (
              <Link
                to={`/pokedex/pokemon/${currentId - 1}`}
                className="arrow"
                aria-label={`Pokemon précédent numéro ${currentId - 1}`}
              >
                ◀
              </Link>
            ) : (
              <a
                role="link"
                className="arrow disabled"
                aria-disabled="true"
                aria-label="Aucun pokemon précédent"
              >
                ᐊ
              </a>
            )}

            <p className="nameAndIdContainerPokemonId">Pokemon N°{currentId}</p>

            {currentId < maxPokemon ? (
              <Link
                to={`/pokedex/pokemon/${currentId + 1}`}
                className="arrow"
                aria-label={`Pokemon suivant numéro ${currentId + 1}`}
              >
                ▶
              </Link>
            ) : (
              <a
                role="link"
                className="arrow disabled"
                aria-disabled="true"
                aria-label="Aucun pokemon suivant"
              >
                ᐅ
              </a>
            )}
          </div>
        </div>

        <ul className="pokedexPageContainer">
          <li className="pokedexPageContainerTypesContainer">
            <p className="typesContainerTypesTitle">
              Type<span aria-hidden="true">(s)</span> :
            </p>
            {pokemonTypes.map((type) => (
              <span className="typesContainerPokedexType" key={type}>
                {translateType(type)}
              </span>
            ))}
          </li>

          <li className="pokedexPageContainerWeightAndHeightContainer">
            <div className="pokedexPageContainerWeightContainer">
              <p className="weightContainerWeightTitle">Poids : </p>
              <p className="weightContainerWeight">{pokemonWeight / 10} kg </p>
            </div>
            <div className="pokedexPageContainerHeightContainer">
              <p className="heightContainerHeightTitle">Taille : </p>
              <p className="heightContainerHeight">{pokemonHeight / 10} m</p>
            </div>
          </li>

          <li className="pokedexPageContainerCategoryContainer">
            <p className="categoryContainerCategoryTitle">Égorie :</p>
            <p className="categoryContainerCategory">{pokemonCategory}</p>
          </li>

          {/* <li className="pokedexPageContainerGenderContainer">
					<p className="genderContainerGenderTitle">Genre(s):</p>
					<p className="genderContainerGender">
						{pokemonGenders.length === 2
							? pokemonGenders.join(" & ")
							: pokemonGenders}
					</p>
				</li> */}

          <li className="pokedexPageContainerDescriptionContainer">
            <p className="descriptionContainerDescriptionTitle">
              Description :
            </p>
            <p className="descriptionContainerDescriptionText">
              {pokemon.description}
            </p>
          </li>
        </ul>
        <Link
          to="/pokedex"
          className="backToHomeLink"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.currentTarget.blur();
            }
          }}
        >
          Revenir à l'accueil pour voir les pokemons
        </Link>
      </div>
    );
  }
};
export default PokedexPage;
