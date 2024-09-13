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
  collectionDataList: Array<CollectionData>;
  updateCollectionDataList: (latestList: Array<CollectionData>) => void;
}

// ========== コンポーネント関数 ==========
export default function Collection({
  pokemonList,
  collectionDataList,
  updateCollectionDataList,
}: Props) {
  // -------- useState：宣言 --------
  const [selectedPokemon, setSelectedPokemon] = useState<DefaultPokemonName | string>('');

  // -------- useState：state更新処理 --------
  const trackSelectedPokemon = (targetPokemon: DefaultPokemonName | string) => {
    const updatedCollectionOrder = collectionDataList.map((data) => ({
      ...data,
      selected: data.name === targetPokemon,
    }));

    updateCollectionDataList(updatedCollectionOrder);
    setSelectedPokemon(targetPokemon);
  };
  // -------- useEffect：初回マウント時 --------
  useEffect(() => {
    if (collectionDataList.length > 0) {
      trackSelectedPokemon(collectionDataList[0].name);
    }
  }, []);

  return (
    <section>
      <ul>
        {collectionDataList.map((pokemon) => (
          <li
            key={pokemon.name}
            onClick={() => {
              trackSelectedPokemon(pokemon.name);
            }}
          >
            <Image src={pokemon.imageUrl} alt={pokemon.name} width={50} height={50} />
            <h3>{pokemon.japaneseName}</h3>
            <p>レベル{pokemon.level}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
