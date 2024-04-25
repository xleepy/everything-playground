import { pokemonApi } from "@/lib/api";
import Link from "next/link";

export default async function Home() {
  const pokemons = await pokemonApi.listPokemons();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {pokemons.results.map(({ name }) => {
        return (
          <Link key={name} className="text-white" href={`/pokemon/${name}`}>
            {name}
          </Link>
        );
      })}
    </main>
  );
}
