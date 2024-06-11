import { PokemonClient, Pokemon } from "pokenode-ts";

export const pokemonApi = new PokemonClient();

// cries exists in object but missing in types
export type Cries = {
  latest: string;
  legacy: string;
};

export type ExtendedPokemon = Pokemon & { cries: Cries };
