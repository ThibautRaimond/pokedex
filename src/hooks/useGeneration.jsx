import { useState } from "react";

const generations = {
	gen1: { from: 1, to: 151 },
	gen2: { from: 152, to: 251 },
	gen3: { from: 252, to: 386 },
	gen4: { from: 387, to: 493 },
	gen5: { from: 494, to: 649 },
	gen6: { from: 650, to: 721 },
	gen7: { from: 722, to: 809 },
	gen8: { from: 810, to: 898 },
};

const useGenerations = () => {
	const [selectedGenerations, setSelectedGenerations] = useState({
		gen1: true,
		gen2: false,
		gen3: false,
		gen4: false,
		gen5: false,
		gen6: false,
		gen7: false,
		gen8: false,
	});

	const handleGenerationSelection = (e) => {
		const { name, checked } = e.target;
		setSelectedGenerations((prevGenerations) => ({
			...prevGenerations,
			[name]: checked,
		}));
	};

	const getSelectedGenerations = () => {
		const selected = Object.entries(selectedGenerations)
			.filter(([gen, isSelected]) => isSelected)
			.map(([gen, isSelected]) => generations[gen]);

		return selected;
	};

	return {
		selectedGenerations,
		handleGenerationSelection,
		getSelectedGenerations,
	};
};

export default useGenerations;
