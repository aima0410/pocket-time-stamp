// ---- Next ----
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import CollectionData from 'src/types/CollectionData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';
// ---- Utisl ----
import { getRemainingReqExpForNext } from '@utils/getLevelInfo';

// ========== 型定義 ===========
interface Props {
  swithAppStatus: (newMode: AppStatus) => void;
  selectedCollectionData: CollectionData;
  expGained: { exp: number; isEvolution: boolean };
}

// ========== コンポーネント関数 ===========
export default function DoneDialog({ swithAppStatus, selectedCollectionData, expGained }: Props) {
  const router = useRouter();
  return (
    <div className="modal-back">
      <div
        className={`modal ${css`
          justify-content: center;
        `}`}
      >
        <h3
          className={css`
            font-size: 40px;
            font-family: var(--yusei);
            line-height: 1.5em;
            color: #666;
          `}
        >
          {expGained.isEvolution ? (
            <>
              おめでとう！
              <br />
              進化しました！
            </>
          ) : (
            <>
              経験値を獲得！
              <br />
              やったね！
            </>
          )}
        </h3>
        <Image
          src={selectedCollectionData.imageUrl}
          alt={selectedCollectionData.japaneseName}
          width={100}
          height={100}
          className={css`
            margin-top: 30px;
            margin-bottom: 30px;
            width: 100px;
            height: 100px;
          `}
        />
        <div
          className={css`
            margin-bottom: 30px;
            font-size: 30px;
          `}
        >
          <span
            className={css`
              display: inline-block;
              padding: 10px 15px;
              color: #fff;
              background-color: #999999;
              font-weight: 600;
              margin-right: 10px;
              border-radius: 6px;
            `}
          >
            EXP
          </span>
          <span
            className={css`
              color: #666;
              font-weight: 600;
            `}
          >
            ＋{expGained.exp}
          </span>
        </div>
        <div
          className={css`
            position: relative;
            width: 450px;
            height: 50px;
            background-color: #bfbfbf;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 30px;
          `}
        >
          <span
            className={css`
              position: absolute;
              top: 16px;
              left: 30px;
              display: block;
              color: #fff;
              margin-bottom: 10px;
            `}
          >
            新しい経験値：
            <span
              className={css`
                letter-spacing: 0.1em;
              `}
            >
              {selectedCollectionData.XP}
            </span>
          </span>
          <span
            className={css`
              display: block;
              background-color: #d07e9c;
              height: 50px;
              border-radius: 10px;
            `}
            style={{
              width: `${
                (selectedCollectionData.XP /
                  (selectedCollectionData.XP +
                    getRemainingReqExpForNext(
                      selectedCollectionData.level,
                      selectedCollectionData.XP,
                    ))) *
                100
              }%`,
            }}
          ></span>
        </div>
        <button
          className={css`
            background-color: #e096b2;
          `}
          onClick={() => {
            swithAppStatus('StandbyMode');
            router.refresh();
            router.push('/');
          }}
        >
          完了
        </button>
      </div>
    </div>
  );
}
