import { ExtendedPokemon, pokemonApi } from "@/lib/api";
import { Fragment } from "react";
import { SidePanel } from "./side-panel";
import { Content } from "./content";

type Props = {
  params: {
    name: string;
  };
};

export default async function Page({ params }: Props) {
  const pokemon = await pokemonApi.getPokemonByName(params.name);
  return (
    <Fragment>
      <SidePanel pokemon={pokemon} />
      <Content pokemon={pokemon as ExtendedPokemon} />
    </Fragment>
  );
}
