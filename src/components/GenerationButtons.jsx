import React from "react";

const GenerationButtons = ({
	generationPokemonCount,
	generation,
	onGenerationChange,
}) => {
	return (
		<div className="generation-buttons">
			{generationPokemonCount.map((count, index) => (
				<button
					key={index}
					onClick={() => onGenerationChange(index)}
					className={generation === index ? "selected" : ""}
				>
					Génération {index + 1}
				</button>
			))}
		</div>
	);
};

export default GenerationButtons;
