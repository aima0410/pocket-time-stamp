// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import Pokemon from 'src/types/Pokemon';
import DefaultPokemonName from 'src/types/PokemonName';
import CollectionData from 'src/types/CollectionData';
// ---- Utils ----
import { sortPokemonCollection } from '@utils/sortUtils';

// ========== 型定義 ==========
interface Props {
  pokemonList: Array<Pokemon>;
  collectionData: Array<CollectionData>;
  updateCollectionData: (latestList: Array<CollectionData>) => void;
}

// ========== コンポーネント関数 ==========
export default function Collection({
  pokemonList,
  collectionData,
  updateCollectionData,
}: Props) {
  // -------- useState：宣言 --------
  const [selectedPokemon, setSelectedPokemon] = useState<DefaultPokemonName | string>('');

  // -------- useState：state更新処理 --------
  const trackSelectedPokemon = (targetPokemon: DefaultPokemonName | string) => {
    const updatedCollectionOrder = collectionData.map((data) => ({
      ...data,
      selected: data.name === targetPokemon,
    }));

    updateCollectionData(updatedCollectionOrder);
    setSelectedPokemon(targetPokemon);
  };
  // -------- useEffect：初回マウント時 --------
  useEffect(() => {
    if (collectionData.length > 0) {
      trackSelectedPokemon(collectionData[0].name);
    }
  }, []);

  return (
    <section>
      <ul>
        {collectionData.map((pokemon) => (
          <li
            key={pokemon.id}
            onClick={() => {
              trackSelectedPokemon(pokemon.name);
            }}
          >
            <Image src={pokemon.imageUrl} alt={pokemon.japaneseName} width={50} height={50} />
            <h3>{pokemon.japaneseName}</h3>
            <p>レベル{pokemon.level}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
