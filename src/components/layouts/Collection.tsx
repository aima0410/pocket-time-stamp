'use client';

// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import Pokemon from 'src/types/Pokemon';
import DefaultPokemonName from 'src/types/PokemonName';
import CollectionData from 'src/types/CollectionData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const wrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: space-around;
  height: 100%;
`;

const collectionStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 45%;
  border-radius: 10px;
`;

const imageBackgroundStyle = css`
  padding: 8px;
  border-radius: 50%;
  background-color: #e4e4e45a;
  margin-bottom: 20px;
`;

const pokemonNameStyle = css`
  font-family: var(--yusei);
  letter-spacing: 0.04em;
  font-size: 20px;
  margin-bottom: 10px;
`;

// ========== 型定義 ==========
interface Props {
  pokemonList: Array<Pokemon>;
  collectionData: Array<CollectionData>;
  updateCollectionData: (latestList: Array<CollectionData>) => void;
}

// ========== コンポーネント関数 ==========
export default function Collection({ pokemonList, collectionData, updateCollectionData }: Props) {
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

  // -------- JSX --------
  return (
    <div style={{ height: '100%' }}>
      <ul className={wrapperStyle}>
        {collectionData.map((pokemon) => (
          <li
            key={pokemon.id}
            onClick={() => {
              trackSelectedPokemon(pokemon.name);
            }}
            className={collectionStyle}
            style={{
              backgroundColor: pokemon.selected ? '#d799a1' : '#ddd',
              color: pokemon.selected ? '#fff' : '',
            }}
          >
            <div className={imageBackgroundStyle}>
              <Image src={pokemon.imageUrl} alt={pokemon.japaneseName} width={100} height={100} />
            </div>
            <h3 className={pokemonNameStyle}>{pokemon.japaneseName}</h3>
            <p style={{ fontFamily: 'var(--yusei)' }}>レベル{pokemon.level}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
