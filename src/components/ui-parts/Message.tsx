// ---- React ----
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// ---- Types ----
import CollectionData from 'src/types/CollectionData';

// ========== 型定義 ==========
interface Props {
  selectedCollectionData: CollectionData;
}
const getRandomSpeech = (speechOtions: Array<string>): string => {
  const maxIndex = speechOtions.length - 1;
  const selectedIndex = Math.floor(Math.random() * (maxIndex + 1));
  const selectedSpeech = speechOtions[selectedIndex];
  return selectedSpeech;
};

// ========== コンポーネント関数 ==========
export default function Message({ selectedCollectionData }: Props) {
  const [speech, setSpeech] = useState('');
  const pathname = usePathname();

  const randomSpeechOptions = [
    'キミに会えて嬉しいよ！',
    '大きくなってキミの役に立ちたいな！',
    '習慣は人生の方向性を大きく決めるよ！',
    '幸せとは自らの手で掴むものである！',
    'お腹空いてきた…。',
    '激しいバトルがしたい！！',
    '今ならあのピカチュウにも勝てる気がする。',
    '今日も明日もレベルアップ！！',
    'キミと一緒ならどんな冒険も楽しいよ！',
    '今日はどんな素敵なことが起きるかな？ワクワク！',
    'キミの笑顔はまるで太陽みたいだね！',
    '困難？それはただの経験値だよ！\nレベルアップのチャンス！',
    'ポケモンマスターへの道は長いけど一緒に進もうね！',
    'キミの夢を応援してるよ！いつか必ず叶うはず！',
    '今日も一日ベストを尽くそう！\nでも休憩も大切だよ！',
    'キミの頑張りはきっと誰かの勇気になってるんだ！',
    'たまには深呼吸して周りの景色を楽しもうよ！',
    '君のポケモン愛、超伝説級だね！',
    'どんな小さな進歩も大切な一歩だよ！',
    '今日のキミは昨日のキミより少し強くなってる！',
    'ピカチュウの電撃より、\nキミの笑顔の方がまぶしいよ！',
    '困ったときは仲間を呼ぼう！\n仲間となら何でも乗り越えられる！',
    'キミの心の中に伝説のポケモンが眠ってるかも？',
    'たまには"あまえる"を使ってゆっくり休むのもいいよ！',
    'キミの努力はきっといつか大きな実を結ぶよ！楽しみだな〜！',
    '育てるポケモンはコレクションでいつでも変更できるよ！',
    'タイムスタンプを作成すると経験値が獲得できるよ！',
    '早速今日のタイムスタンプを作成してみよう！',
    '作成したタイムスタンプは「直近の履歴」から編集できるよ！',
    `最強の${selectedCollectionData.japaneseName}になる！`,
  ];

  useEffect(() => {
    setSpeech(getRandomSpeech(randomSpeechOptions));
  }, [selectedCollectionData, pathname]);

  return (
    <>
      <p style={{ whiteSpace: 'pre-line' }}>{speech}</p>
    </>
  );
}
