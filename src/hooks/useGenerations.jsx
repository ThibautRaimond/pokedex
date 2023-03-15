import { useState } from "react";

const generations = {
	1: { from: 1, to: 151 },
	2: { from: 152, to: 251 },
	3: { from: 252, to: 386 },
	4: { from: 387, to: 493 },
	5: { from: 494, to: 649 },
	6: { from: 650, to: 721 },
	7: { from: 722, to: 809 },
	8: { from: 810, to: 898 },
};

const useGenerations = () => {
	const [generationsState, setGenerationsState] = useState({
		1: true,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
		8: false,
	});

	const selectedGenerations = Object.entries(generationsState)
		.filter(([gen, isSelected]) => isSelected)
		.map(([gen, isSelected]) => gen);

	const genFrom = selectedGenerations.reduce(
		(acc, gen) => Math.min(acc, generations[gen].from),
		Number.MAX_SAFE_INTEGER
	);
	const genTo = selectedGenerations.reduce(
		(acc, gen) => Math.max(acc, generations[gen].to),
		Number.MIN_SAFE_INTEGER
	);

	const handleChangeGeneration = (gen) => {
		setGenerationsState((prevState) => ({
			...prevState,
			[gen]: !prevState[gen],
		}));
	};

	return {
		generationsState,
		selectedGenerations,
		genFrom,
		genTo,
		handleChangeGeneration,
	};
};

export { generations, useGenerations };
