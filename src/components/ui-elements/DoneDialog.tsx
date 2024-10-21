'use client';

// ---- Next ----
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import CollectionData from 'src/types/CollectionData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';
// ---- Constans ----
import levelTable from '@assets/LevelTable';

// ========== CSS宣言 ==========
const headingStyle = css`
  font-size: 40px;
  font-family: var(--yusei);
  line-height: 1.5em;
  font-weight: 600;
  font-family: var(--yusei);
  color: #666;
`;

const pokemonImgStyle = css`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100px;
  height: 100px;
`;

const expTxtWrapperStyle = css`
  margin-bottom: 30px;
  font-size: 30px;
  color: #ffaa00;
`;

const expTxtStyle = css`
  display: inline-block;
  padding: 10px 15px;
  background-color: #f7ff17;
  font-weight: 600;
  margin-right: 10px;
  border-radius: 6px;
`;

const expBarWrapperStyle = css`
  position: relative;
  width: 450px;
  height: 50px;
  background-color: #bfbfbf;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const expBarCaptionStyle = css`
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

// ========== 型定義 ===========
interface Props {
  swithAppStatus: (newMode: AppStatus) => void;
  selectedCollectionData: CollectionData;
  expGained: { exp: number; isEvolution: boolean; isLevelUp: boolean };
}

// ========== コンポーネント関数 ===========
export default function DoneDialog({ swithAppStatus, selectedCollectionData, expGained }: Props) {
  // -------- useRouter --------
  const router = useRouter();

  // -------- JSX --------
  return (
    <div className="modal-back">
      <div className="modal" style={{ justifyContent: 'center' }}>
        <h3 className={headingStyle}>
          {expGained.isEvolution ? (
            <>
              おめでとう！
              <br />
              進化しました！
            </>
          ) : (
            <>
              {expGained.isLevelUp ? (
                <>
                  おめでとう！
                  <br />
                  レベル{selectedCollectionData.level}
                  になったよ！
                </>
              ) : (
                <>
                  経験値を獲得！
                  <br />
                  やったね！
                </>
              )}
            </>
          )}
        </h3>
        <Image
          src={selectedCollectionData.imageUrl}
          alt={selectedCollectionData.japaneseName}
          width={100}
          height={100}
          className={pokemonImgStyle}
        />
        <div className={expTxtWrapperStyle}>
          <span className={expTxtStyle}>EXP</span>
          <span style={{ fontWeight: 600 }}>＋{expGained.exp}</span>
        </div>
        <div className={expBarWrapperStyle}>
          <span className={expBarCaptionStyle}>
            新しい経験値：
            <span style={{ letterSpacing: '0.1em' }}>
              {selectedCollectionData.XP - levelTable[selectedCollectionData.level - 1].totalExp}
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
        <button
          style={{ backgroundColor: '#e096b2' }}
          onClick={() => {
            swithAppStatus('StandbyMode');
            router.push('/');
          }}
        >
          完了
        </button>
      </div>
    </div>
  );
}
