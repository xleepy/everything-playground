import type { Cries, ExtendedPokemon } from "@/lib/api";
import { Audio } from "./audio";

export const Content = ({ pokemon }: { pokemon: ExtendedPokemon }) => {
  const { abilities, cries } = pokemon;
  return (
    <div className="p-4">
      <div>
        <h3>Abilities</h3>
        {abilities.map((a) => {
          return <p key={a.ability.name}>{a.ability.name}</p>;
        })}
      </div>
      <div>
        <h3>Cries</h3>
        {Object.keys(cries).map((key) => {
          return (
            <Audio key={key} label={key} source={cries[key as keyof Cries]} />
          );
        })}
      </div>
    </div>
  );
};
