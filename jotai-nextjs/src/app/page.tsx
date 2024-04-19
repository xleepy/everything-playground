"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { Pokemon, PokemonClient } from "pokenode-ts";
import { ChangeEventHandler, Suspense, use, useRef } from "react";
import atomWithDebounce from "./atomWithDebounce";
import { ErrorBoundary } from "./error-boundary";

const api = new PokemonClient();

const { currentValueAtom, debouncedValueAtom } = atomWithDebounce("luxray");

type PokemonProps = {
  pokemonPromise: Promise<Pokemon>;
};
const PokemonDetail = ({ pokemonPromise }: PokemonProps) => {
  const { name, abilities, stats } = use(pokemonPromise);
  return (
    <div className="my-4">
      <p>{`Name: ${name}`}</p>
      <p>{`Abilities: ${abilities.map((a) => a.ability.name).join(",")}`}</p>
      <p>{`Stats: ${stats.map((stat) => stat.stat.name).join(",")}`}</p>
    </div>
  );
};

const Component = () => {
  const query = useAtomValue(debouncedValueAtom);
  if (query.length === 0) {
    return <p>{`Please enter something`}</p>;
  }
  const data = api.getPokemonByName(query);
  return (
    <ErrorBoundary fallback={<p>Failed to fetch</p>}>
      <Suspense fallback={<p>Loading....</p>}>
        <PokemonDetail pokemonPromise={data} />
      </Suspense>
    </ErrorBoundary>
  );
};

const Search = () => {
  // https://jotai.org/docs/recipes/atom-with-debounce
  const currentValue = useAtomValue(currentValueAtom);
  const setDebouncedValue = useSetAtom(debouncedValueAtom);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDebouncedValue(event.target.value);
  };

  return (
    <input
      className="bg-black border-white"
      value={currentValue}
      onChange={handleChange}
    />
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Search />
      <Component />
    </main>
  );
}
