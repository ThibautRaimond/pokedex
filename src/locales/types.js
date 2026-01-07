export const translateType = (type) => {
  switch (type) {
    case "normal":
      return "Normal";
    case "fire":
      return "Feu";
    case "water":
      return "Eau";
    case "electric":
      return "Électrique";
    case "grass":
      return "Plante";
    case "ice":
      return "Glace";
    case "fighting":
      return "Combat";
    case "poison":
      return "Poison";
    case "ground":
      return "Sol";
    case "flying":
      return "Vol";
    case "psychic":
      return "Psy";
    case "bug":
      return "Insecte";
    case "rock":
      return "Roche";
    case "ghost":
      return "Spectre";
    case "dragon":
      return "Dragon";
    case "dark":
      return "Ténèbres";
    case "steel":
      return "Acier";
    case "fairy":
      return "Fée";
    default:
      return type;
  }
};

export const getTypeClassName = (type) => {
  switch (type) {
    case "normal":
      return "normal";
    case "fire":
      return "fire";
    case "water":
      return "water";
    case "electric":
      return "electric";
    case "grass":
      return "grass";
    case "ice":
      return "ice";
    case "fighting":
      return "fighting";
    case "poison":
      return "poison";
    case "ground":
      return "ground";
    case "flying":
      return "flying";
    case "psychic":
      return "psychic";
    case "bug":
      return "bug";
    case "rock":
      return "rock";
    case "ghost":
      return "ghost";
    case "dragon":
      return "dragon";
    case "dark":
      return "dark";
    case "steel":
      return "steel";
    case "fairy":
      return "fairy";
    default:
      return "type";
  }
};
