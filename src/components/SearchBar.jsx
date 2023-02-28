import React from "react";

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
	return (
		<input
			type="text"
			placeholder="Rechercher par nom ou ID"
			value={searchTerm}
			onChange={(event) => onSearchTermChange(event.target.value)}
		/>
	);
};

export default SearchBar;
