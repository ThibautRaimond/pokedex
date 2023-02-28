import React from "react";

const PokemonList = ({ pokemonDetails }) => {
	return (
		<ul className="pokemons">
			{pokemonDetails.map((pokemon, index) => (
				<li className="pokemon" key={index}>
					<p>{pokemon.name}</p>
					<p>N° {pokemon.id}</p>
					<img src={pokemon.image} alt={pokemon.name} />
				</li>
			))}
		</ul>
	);
};

export default PokemonList;
