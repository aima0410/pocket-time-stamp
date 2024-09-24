import { useEffect, useState } from 'react';

// ========== 型定義 ==========
interface Props {
  messageMode: MessageMode;
}

type MessageMode = 'EmptyTodayData' | 'RandamSpeech';

// ========== コンポーネント関数 ==========
export default function Message({ messageMode }: Props) {
  const [speech, setSpeech] = useState('');

  useEffect(() => {
    switch (messageMode) {
      case 'EmptyTodayData':
        setSpeech('本日の記録がまだだよ！\nタイムスタンプを作成しよう！');
        break;
      default:
        break;
    }
  }, [messageMode]);

  return (
    <>
      <p style={{ whiteSpace: 'pre-line' }}>{speech}</p>
    </>
  );
}
