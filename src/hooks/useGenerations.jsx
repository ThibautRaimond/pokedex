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
export { generations };

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

	const handleChangeGeneration = (gen) => {
		setGenerationsState((prevState) => ({
			...prevState,
			[gen]: !prevState[gen],
		}));
		console.log("handleCHangeGeneration")
	};
	
	return {
		generationsState,
		handleChangeGeneration,
	};
	};
	
	export default useGenerations;