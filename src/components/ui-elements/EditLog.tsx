export default function EditLog() {
  return (
    <fieldset>
      <legend>編集</legend>
      <ul>
        <li>
          日付
          <input type="date" name="" id="" />
        </li>
        <li>
          開始時刻
          <input type="time" name="" id="" />
        </li>
        <li>
          終了時刻
          <input type="time" name="" id="" />
        </li>
        <li>
          休憩時間(分)
          <input type="number" name="" id="" />
        </li>
        <li>活動時間 1時間30分</li>
        <li>
          内容
          <select name="" id="">
            <option value="運動">運動</option>
            <option value="語学学習">語学学習</option>
            <option value="個人開発">個人開発</option>
            <option value="読書">読書</option>
          </select>
        </li>
        <li>
          <button>キャンセル</button>
        </li>
        <li>
          <button>更新</button>
        </li>
      </ul>
    </fieldset>
  );
}