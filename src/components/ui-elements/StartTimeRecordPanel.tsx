'use client';

// ---- React ----
import { useState } from 'react';
// ---- Images ----
import Image from 'next/image';
import editIcon from '@assets/edit.svg';
import deleteIcon from '@assets/delete.svg';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  activities: Array<string>;
  updateActivitiesState: (newActivitiesList: Array<string>) => void;
  status: AppStatus;
  switchStatusState: (newMode: AppStatus) => void;
}

export default function StartTimeRecordPanel({
  activities,
  updateActivitiesState,
  status,
  switchStatusState,
}: Props) {
  const [activityUnderEditing, setActivityUnderEditing] = useState<string | null>(null);
  const [newActivity, setNewActivity] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);

  const updateActivities = () => {
    const newAcitivitiesList = activities.map((activity) => {
      if (activity === activityUnderEditing) {
        return newActivity;
      }
      return activity;
    });
    updateActivitiesState(newAcitivitiesList);
  };

  return (
    <>
      <p>ボタンをクリックすると開始時刻が記録されます。記録内容はあとから編集可能です。</p>
      <ul>
        {activities.map((activity) => (
          <li>
            {status === 'EditActivitiesMode' && activity === activityUnderEditing ? (
              <input
                value={newActivity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewActivity(e.target.value);
                }}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onKeyDown={(e: React.KeyboardEvent) =>
                  e.key === 'Enter' && isComposing === false && updateActivities()
                }
              />
            ) : (
              <button onClick={() => {switchStatusState('PlayMode')}}>{activity}</button>
            )}
            {activity !== activityUnderEditing && (
              <button
                onClick={() => {
                  switchStatusState('EditActivitiesMode');
                  setNewActivity(activity);
                  setActivityUnderEditing(activity);
                }}
              >
                <Image src={editIcon} alt="" width={16} />
              </button>
            )}
            {status === 'EditActivitiesMode' && activity === activityUnderEditing && (
              <>
                <button
                  onClick={() => {
                    updateActivities();
                    setActivityUnderEditing(null);
                    switchStatusState('StandbyMode');
                  }}
                >
                  変更
                </button>
                <button
                  onClick={() => {
                    const newActivitiesList = activities.map((activity) => {
                      if (activity === activityUnderEditing) {
                        return '';
                      }
                      return activity;
                    });
                    updateActivitiesState(newActivitiesList);
                    setActivityUnderEditing(null);
                    switchStatusState('StandbyMode');
                  }}
                >
                  <Image src={deleteIcon} alt="" width={16} />
                </button>
              </>
            )}
          </li>
        ))}
        <li>
          <button onClick={() => switchStatusState('CreateActivityMode')}>+ 新規作成</button>
        </li>
      </ul>
      {/* 活動選択を編集するボタン */}
    </>
  );
}
