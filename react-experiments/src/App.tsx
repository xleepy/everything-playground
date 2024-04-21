import {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import { Pokemon, PokemonClient } from "pokenode-ts";
import { ErrorBoundary } from "react-error-boundary";

const api = new PokemonClient();

// poor-mans use hook. Will not work with context though
// https://react.dev/reference/react/use
const map = new WeakMap();
function usePromiseHook<T>(promise: Promise<T>): T {
  const data = map.get(promise);
  if (!data) {
    throw promise.then((data) => {
      map.set(promise, data);
    });
  }
  return data;
}

type Props = {
  pokemonPromise: Promise<Pokemon>;
};

const PokemonComponent = ({ pokemonPromise }: Props) => {
  const data = usePromiseHook(pokemonPromise);
  return (
    <div>
      <p>{`Name: ${data.name}`}</p>
      <p>{`Abilities: ${data.abilities
        .map((a) => a.ability.name)
        .join(",")}`}</p>
    </div>
  );
};

const PokemonContainer = ({ query = "pikachu" }: { query?: string }) => {
  const data = api.getPokemonByName(query);

  return (
    <ErrorBoundary resetKeys={[query]} fallback={<p>Failed to fetch...</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <PokemonComponent pokemonPromise={data} />
      </Suspense>
    </ErrorBoundary>
  );
};

export function useDebounceCallback<T extends (...args: any) => void>(
  callback: T,
  delay: number,
  deps: any[]
) {
  const timeoutRef = useRef<number>();
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return useCallback(
    (...args: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, ...deps]
  );
}

function App() {
  const [search, setSearch] = useState<string>("pikachu");

  const handleChange = useDebounceCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250,
    []
  );

  return (
    <div>
      <input
        defaultValue={search}
        placeholder="enter name"
        onChange={handleChange}
      />
      <PokemonContainer query={search} />
    </div>
  );
}

export default App;
