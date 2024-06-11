import Image from "next/image";
import type { Pokemon } from "pokenode-ts";

export function SidePanel({ pokemon }: { pokemon: Pokemon }) {
  const { name, sprites } = pokemon;
  const image = sprites.front_default;
  return (
    <div className="flex flex-col items-center border-r border-r-gray-600">
      {image && (
        <Image
          loading="lazy"
          priority={false}
          alt="pokemon-image"
          src={image}
          width={150}
          height={150}
        />
      )}
      <h2>{name}</h2>
    </div>
  );
}
