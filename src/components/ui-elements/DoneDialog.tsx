// ---- Next ----
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import CollectionData from 'src/types/CollectionData';

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
    <div>
      <Image
        src={selectedCollectionData.imageUrl}
        alt={selectedCollectionData.japaneseName}
        width={50}
        height={50}
      />
      獲得した経験値！{expGained.exp}
      最終XP：{selectedCollectionData.XP}
      {expGained.isEvolution && <>おめでとう！進化しました！</>}
      <button
        onClick={() => {
          swithAppStatus('StandbyMode');
          router.refresh();
          router.push('/');
        }}
      >
        完了
      </button>
    </div>
  );
}
