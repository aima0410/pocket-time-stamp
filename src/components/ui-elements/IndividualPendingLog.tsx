// ---- Images ----
import Image from "next/image";
import editIcon from '@assets/edit.svg';
import deleteIcon from '@assets/delete.svg';

interface Props {
  date: string;
  startingTime: string;
  endingTime: string;
  restTime: string;
  activeTime: string;
  activity: string;
}

export default function IndividualPendingLog({
  date,
  startingTime,
  endingTime,
  restTime,
  activeTime,
  activity,
}: Props) {
  return (
    <tr>
      <td>{date}</td>
      <td>{startingTime}</td>
      <td>{endingTime}</td>
      <td>{restTime}</td>
      <td>{activeTime}</td>
      <td>{activity}</td>
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
  );
}
