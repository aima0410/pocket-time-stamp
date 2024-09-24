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
  selectedCollectionData: CollectionData | null;
}

// ========== コンポーネント関数 ==========
export default function Home({ selectedCollectionData }: Props) {
  // -------- JSX --------
  return (
    <>
      Home
      {selectedCollectionData && <Message selectedCollectionData={selectedCollectionData} />}
      <div>
        {selectedCollectionData ? (
          <>
            <Image
              src={selectedCollectionData.imageUrl}
              alt={selectedCollectionData.japaneseName}
              width={100}
              height={100}
            />
            <h3>{selectedCollectionData.japaneseName}</h3>
            <p>レベル{selectedCollectionData.level}</p>
            <div>経験値{selectedCollectionData.XP}</div>
          </>
        ) : (
          <p>Now Loading...</p>
        )}
      </div>
      <TimeLine date={'理想のタイムライン'} timeLine={[]} />
    </>
  );
}
