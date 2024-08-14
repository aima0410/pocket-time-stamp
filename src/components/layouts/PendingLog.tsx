// ---- Images ----
import Image from 'next/image';
import editIcon from '@assets/edit.svg';
import deleteIcon from '@assets/delete.svg';

export default function PendingLog() {
  return (
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
  );
}
