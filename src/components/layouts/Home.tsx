'use client';

// ---- Next ----
import Image from 'next/image';
// ---- Components ----
import Message from '@ui-parts/Message';
// ---- Types ----
import CollectionData from 'src/types/CollectionData';
// ---- Constants ----
import levelTable from '@assets/LevelTable';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const wrapperStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 100px;
  color: #474747;
  font-family: var(--yusei);
`;

const pokemonNameStyle = css`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 900;
  letter-spacing: 0.04em;
`;

const levelStyle = css`
  margin-bottom: 36px;
  font-size: 20px;
  font-weight: 600;
`;

const expWrapperStyle = css`
  position: relative;
  width: 580px;
  height: 50px;
  background-color: #bfbfbf;
  border-radius: 10px;
  overflow: hidden;
`;

const expHeadingStyle = css`
  position: absolute;
  top: 16px;
  left: 30px;
  display: block;
  color: #fff;
  margin-bottom: 10px;
`;

const expBarStyle = css`
  display: block;
  background-color: #d07e9c;
  height: 50px;
  border-radius: 10px;
`;

// ========== 型定義 ==========
interface Props {
  selectedCollectionData: CollectionData | null;
}

// ========== コンポーネント関数 ==========
export default function Home({ selectedCollectionData }: Props) {
  // -------- JSX --------
  return (
    <>
      <div className={wrapperStyle}>
        {selectedCollectionData && <Message selectedCollectionData={selectedCollectionData} />}
        {selectedCollectionData ? (
          <>
            <Image
              src={selectedCollectionData.imageUrl}
              alt={selectedCollectionData.japaneseName}
              width={120}
              height={120}
            />
            <h3 className={pokemonNameStyle}>{selectedCollectionData.japaneseName}</h3>
            <p className={levelStyle}>レベル{selectedCollectionData.level}</p>
            <div>
              <div className={expWrapperStyle}>
                <span className={expHeadingStyle}>
                  経験値：
                  <span style={{ letterSpacing: '0.1em' }}>
                    {selectedCollectionData.XP -
                      levelTable[selectedCollectionData.level - 1].totalExp}
                  </span>
                </span>
                <span
                  className={expBarStyle}
                  style={{
                    width: `${
                      ((selectedCollectionData.XP -
                        levelTable[selectedCollectionData.level - 1].totalExp) /
                        levelTable[selectedCollectionData.level].requiredExp) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <p>Now Loading...</p>
        )}
      </div>
    </>
  );
}
