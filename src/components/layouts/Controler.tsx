export default function Controler() {
  return (
    <section>
      <h2>新規ログの作成</h2>
      <fieldset>
        <legend>活動内容の選択</legend>
        <p>ボタンをクリックすると開始時刻が記録されます。記録内容はあとから編集可能です。</p>
        <button>新規追加</button>
        <ul>
          <li>
            <button>運動</button>
          </li>
          <li>
            <button>語学学習</button>
          </li>
          <li>
            <button>個人開発</button>
          </li>
          <li>
            <button>読書</button>
          </li>
        </ul>
      </fieldset>
      <button>終了</button>
    </section>
  );
}
