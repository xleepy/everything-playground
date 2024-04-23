import { pokemonApi } from "@/app/page";
import Image from "next/image";

type Props = {
  params: {
    name: string;
  };
};

export default async function Page({ params }: Props) {
  const { name, sprites } = await pokemonApi.getPokemonByName(params.name);
  return (
    <div className="flex items-center">
      <div>
        <h2>{name}</h2>
      </div>
      {sprites.front_default && (
        <Image
          alt="pokemon-image"
          src={sprites.front_default}
          width={150}
          height={150}
        />
      )}
    </div>
  );
}
