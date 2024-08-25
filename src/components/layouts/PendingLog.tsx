'use client';

// ---- Images ----
import Image from 'next/image';
import editIcon from '@assets/edit.svg';
import deleteIcon from '@assets/delete.svg';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import EditLog from '@components/ui-elements/EditLog';


interface Props {
  status: AppStatus;
}

export default function PendingLog({ status }: Props) {
  return (
    <section>
      <h2>未確定の活動記録</h2>
      <button>まとめて記録を確定する</button>
      <p>一度記録内容を確定してレポートに追加すると編集や削除ができなくなります。</p>
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
            <td>
              <button>記録を確定する</button>
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
            <td>
              <button>記録を確定する</button>
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
            <td>
              <button>記録を確定する</button>
            </td>
          </tr>
        </tbody>
      </table>
      {status === 'EditLogMode' && <EditLog />}
    </section>
  );
}
