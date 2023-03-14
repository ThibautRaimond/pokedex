	// Rechercher par nom ou ID:
	// fonction pour que le insert fonctionne sans accents:

	function removeAccents(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}
	// on filtre tout les pokemons et réinitialise les accents:
	const selectedPokemons = pokemonDetails.filter((pokemon) => {
		// sur le pokemon recherché:
		const nameWithoutAccents = removeAccents(pokemon.name.toLowerCase());
		// et dans le input:
		const searchTermWithoutAccents = removeAccents(searchTerm.toLowerCase());
		return (
			nameWithoutAccents.includes(searchTermWithoutAccents) ||
			pokemon.id.toString() === searchTerm
		);
	});