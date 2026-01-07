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
  const [selectedGeneration, setSelectedGeneration] = useState("1");

  const genFrom = generations[selectedGeneration].from;
  const genTo = generations[selectedGeneration].to;

  const handleChangeGeneration = (gen) => {
    setSelectedGeneration(gen);
  };

  return {
    selectedGeneration,
    genFrom,
    genTo,
    handleChangeGeneration,
  };
};

export { generations, useGenerations };
