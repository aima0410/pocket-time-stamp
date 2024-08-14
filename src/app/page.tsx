import Image from 'next/image';
import editIcon from '@assets/edit.svg';
import deleteIcon from '@assets/delete.svg';

export default function Home() {
  return (
    <main>
      <h1>DoneTimeLogger</h1>
      <p>がんばる社会人のための活動時間記録アプリ</p>
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
      <section>
        <h2>コミット</h2>
        <button>記録を確定する</button>
        <p>一度記録を確定すると編集できなくなります。</p>
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>開始時刻</th>
              <th>終了時刻</th>
              <th>休憩時間</th>
              <th>活動時間</th>
              <th>内容</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024/08/13</td>
              <td>19:10</td>
              <td>20:10</td>
              <td>0分</td>
              <td>1時間</td>
              <td>運動</td>
              <td>
                <button>
                  <Image src={editIcon} alt="" width={16} />
                </button>
              </td>
              <td>
                <button>
                  <Image src={deleteIcon} alt="" width={16} />
                </button>
              </td>
            </tr>
            <tr>
              <td>2024/08/13</td>
              <td>20:10</td>
              <td>21:10</td>
              <td>30分</td>
              <td>30分</td>
              <td>語学学習</td>
              <td>
                <button>
                  <Image src={editIcon} alt="" width={16} />
                </button>
              </td>
              <td>
                <button>
                  <Image src={deleteIcon} alt="" width={16} />
                </button>
              </td>
            </tr>
            <tr>
              <td>2024/08/13</td>
              <td>21:10</td>
              <td>22:10</td>
              <td>30分</td>
              <td>1時間</td>
              <td>語学学習</td>
              <td>
                <button>
                  <Image src={editIcon} alt="" width={16} />
                </button>
              </td>
              <td>
                <button>
                  <Image src={deleteIcon} alt="" width={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <section>
          <h3>編集</h3>
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
        </section>
      </section>
      <section>
        <h2>マージ</h2>
        <section>
          <h3>日にちごと</h3>
          <p>過去30日分だけ表示されます。</p>
          <table>
            <caption>2024/8/13</caption>
            <tbody>
              <tr>
                <th>運動</th>
                <td>1時間</td>
              </tr>
              <tr>
                <th>語学学習</th>
                <td>1時間30分</td>
              </tr>
            </tbody>
          </table>
          <table>
            <caption>2024/8/12</caption>
            <tbody>
              <tr>
                <th>運動</th>
                <td>30分</td>
              </tr>
              <tr>
                <th>読書</th>
                <td>30分</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h3>月ごと</h3>
          <p>過去12ヶ月分だけ表示されます。</p>
          <table>
            <caption>2024/7</caption>
            <tbody>
              <tr>
                <th>運動</th>
                <td>10時間30分</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h3>年ごと</h3>
          <table>
            <caption>2024</caption>
            <tbody>
              <tr>
                <th>運動</th>
                <td>100時間30分</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      {/* ---- GitHub ---- */}
      <article>GitHubリポジトリ</article>
    </main>
  );
}
