// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Components ----
import Message from '@ui-parts/Message';
import IdealTimeLine from '@ui-parts/IdealTimeLine';
// ---- Types ----
import CollectionData from 'src/types/CollectionData';

// ========== 型定義 ==========
interface Props {
  collectionDataList: Array<CollectionData>;
}

// ========== コンポーネント関数 ==========
export default function Home({ collectionDataList }: Props) {
  // -------- useState：宣言 --------
  const [selectedPokemon, setSelectedPokemon] = useState<CollectionData | null>(null);

  // -------- useEffect：現在選択中のポケモンを取得 --------
  useEffect(() => {
    if (collectionDataList) {
      const nowSelect = collectionDataList.find((collection) => collection.selected === true);
      nowSelect && setSelectedPokemon(nowSelect);
    }
  }, [collectionDataList]);

  // -------- JSX --------
  return (
    <>
      Home
      {<Message />}
      <div>
        {selectedPokemon ? (
          <>
            <Image
              src={selectedPokemon.imageUrl}
              alt={selectedPokemon.japaneseName}
              width={100}
              height={100}
            />
            <h3>{selectedPokemon.japaneseName}</h3>
            <p>レベル{selectedPokemon.level}</p>
            <div>経験値{selectedPokemon.XP}</div>
          </>
        ) : (
          <p>Now Loading...</p>
        )}
      </div>
      <IdealTimeLine />
    </>
  );
}
