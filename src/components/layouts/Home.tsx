// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Components ----
import Message from '@ui-parts/Message';
import TimeLine from '@ui-parts/TimeLine';
// ---- Types ----
import CollectionData from 'src/types/CollectionData';

// ========== 型定義 ==========
interface Props {
  collectionData: Array<CollectionData>;
}

// ========== コンポーネント関数 ==========
export default function Home({ collectionData }: Props) {
  // -------- useState：宣言 --------
  const [selectedPokemon, setSelectedPokemon] = useState<CollectionData | null>(null);

  // -------- useEffect：現在選択中のポケモンを取得 --------
  useEffect(() => {
    if (collectionData) {
      const nowSelect = collectionData.find((collection) => collection.selected === true);
      nowSelect && setSelectedPokemon(nowSelect);
    }
  }, [collectionData]);

  // -------- JSX --------
  return (
    <>
      Home
      {<Message messageMode={'EmptyTodayData'} />}
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
      <TimeLine date={'理想のタイムライン'} timeLine={[]} />
    </>
  );
}
