import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/resetCss.css";
import "../styles/homePage.css";

const generationPokemonCount = [151, 251, 386, 493, 649, 721, 809, 898];

const HomePage = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [offset, setOffset] = useState(0);
    const [generation, setGeneration] = useState(0);

    const fetchData = async () => {
        const count = generationPokemonCount[generation];
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=${count}&offset=${offset}`);
        const results = response.data.results;
        const promises = results.map((pokemon) => axios.get(pokemon.url));
        const responses = await Promise.all(promises);
        const details = responses.map((response) => {
            const name = response.data.names.find((n) => n.language.name === "fr").name;
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`;
            const id = response.data.id;
            return { name, image, id };
        });
        setPokemonDetails([...pokemonDetails, ...details]);
    };

    useEffect(() => {
        fetchData();
    }, [offset, generation]);

    const filteredPokemonDetails = pokemonDetails.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || pokemon.id.toString() === searchTerm;
    });

    const handleGenerationChange = (index) => {
        setGeneration(index);
        setOffset(0);
        setPokemonDetails([]);
    };

    const handleClick = () => {
        setOffset(offset + generationPokemonCount[generation]);
    };

    return (
        <main>
            <h1>Liste des Pokémon</h1>
            <div className="generation-buttons">
                {generationPokemonCount.map((count, index) => (
                    <button key={index} onClick={() => handleGenerationChange(index)}>
                        Génération {index + 1}
                    </button>
                ))}
            </div>
            <input
                type="text"
                placeholder="Rechercher par nom ou ID"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <ul className="pokemons">
                {filteredPokemonDetails.map((pokemon, index) => (
                    <li className="pokemon" key={index}>
                        <p>{pokemon.name}</p>
                        <p>N° {pokemon.id}</p>
                        <img src={pokemon.image} alt={pokemon.name} />
                    </li>
                ))}
            </ul>
            <button onClick={handleClick}>Charger plus</button>
        </main>
    );
};

export default HomePage;
