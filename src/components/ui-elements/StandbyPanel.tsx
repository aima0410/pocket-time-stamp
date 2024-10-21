'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ===========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  trackTimedActivity: (newTimedActivity: string | null) => void;
}

// ========== コンポーネント関数 ===========
export default function StandbyPanel({ switchAppStatus, activities, trackTimedActivity }: Props) {
  const activitiesList = activities.map((activity) => {
    return (
      <li
        key={activity}
        className={css`
          margin-left: 10px;
          margin-bottom: 20px;
          height: 80px;
        `}
      >
        <button
          className={css`
            min-width: 200px;
            padding: 30px 40px;
            font-size: 20px;
            text-align: center;
          `}
          onClick={() => {
            trackTimedActivity(activity);
            switchAppStatus('PlayMode');
          }}
        >
          {activity}
        </button>
      </li>
    );
  });

  // -------- JSX --------
  return (
    <>
      <div
        className={css`
          position: relative;
          display: flex;
          flex-direction: column;
          text-align: left;
          padding: 40px;
          width: 100%;
          height: 100%;
        `}
      >
        <h2
          className={css`
            padding-left: 3px;
            margin-bottom: 40px;
            color: #464646;
            font-size: 30px;
            font-weight: 600;
          `}
        >
          新規タイムスタンプを作成
        </h2>
        <ul
          className={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: left;
            align-items: flex-start;
            align-content: flex-start;
            width: 100%;
            height: 80%;
            overflow-y: scroll;
          `}
        >
          {activitiesList}
        </ul>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            switchAppStatus('EditActivitiesMode');
          }}
          className={css`
            position: absolute;
            left: 45px;
            bottom: 20px;
            color: #577dde;
            &:hover {
              color: #8aa6ed;
            }
          `}
        >
          アクティビティを編集する
        </a>
      </div>
    </>
  );
}
