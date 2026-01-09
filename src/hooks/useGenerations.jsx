import { useState } from "react";

export const generations = {
  1: { from: 1, to: 151 },
  2: { from: 152, to: 251 },
  3: { from: 252, to: 386 },
  4: { from: 387, to: 493 },
  5: { from: 494, to: 649 },
  6: { from: 650, to: 721 },
  7: { from: 722, to: 809 },
  8: { from: 810, to: 898 },
  9: { from: 899, to: 1010},
};

export const useGenerations = () => {
  // anciens noms conservés
  const [selectedGeneration, setSelectedGeneration] = useState(1);

  // nouveaux sliders
  const [genStart, setGenStart] = useState(1);
  const [genEnd, setGenEnd] = useState(2);

  const genFrom = generations[genStart].from;
  const genTo = generations[genEnd].to;

  const handleChangeGeneration = (gen) => {
    setSelectedGeneration(gen);
    setGenStart(gen);
    setGenEnd(gen);
  };

  return {

    selectedGeneration,
    handleChangeGeneration,
    genFrom,
    genTo,


    genStart,
    genEnd,
    setGenStart,
    setGenEnd,
  };
};
