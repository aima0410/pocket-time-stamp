'use client';

import { useState } from 'react';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import DisplayDateRange from 'src/types/DisplayDateRange';

interface Props {
  title: string;
  description: string;
  logs: Array<Logs>;
}

type Logs = {
  date: string;
  activities: Array<Activities>;
};

type Activities = {
  name: string;
  totalTime: number;
};

export function DateRangeLogs({ title, description, logs }: Props) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{description}</p>
      {logs.map((log) => (
        <table key={log.date}>
          <caption>{log.date}</caption>
          <tbody>
            {log.activities.map((activity) => (
              <tr key={activity.name}>
                <th>{activity.name}</th>
                <td>{activity.totalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </section>
  );
}

interface CProps {
  status: AppStatus;
}

export default function ConfirmedLogs({ status }: CProps) {
  const [displayDateRange, setDisplayDateRange] = useState<DisplayDateRange>('DayDisplay');

  let title = '';
  let description = '';
  let rangeNum = 0;

  if (displayDateRange === 'DayDisplay') {
    title = '日にちごと';
    description = '過去30日分だけ表示されます。';
    rangeNum = 0;
  } else if (displayDateRange === 'MonthDisplay') {
    title = '月ごと';
    description = '過去12ヶ月分だけ表示されます。';
    rangeNum = 1;
  } else if (displayDateRange === 'YearDisplay') {
    title = '年ごと';
    description = '';
    rangeNum = 2;
  }

  const dayLogs = [
    {
      date: '2024/08/13',
      activities: [
        { name: '運動', totalTime: 60 },
        { name: '語学学習', totalTime: 90 },
      ],
    },
    {
      date: '2024/08/12',
      activities: [
        { name: '運動', totalTime: 30 },
        { name: '読書', totalTime: 30 },
      ],
    },
  ];

  const monthLogs = [
    {
      date: '2024/07',
      activities: [
        { name: '運動', totalTime: 600 },
        { name: '読書', totalTime: 250 },
      ],
    },
  ];

  const yearLogs = [
    {
      date: '2024',
      activities: [
        { name: '運動', totalTime: 1000 },
        { name: '語学学習', totalTime: 1570 },
        { name: '読書', totalTime: 250 },
      ],
    },
  ];

  const logs = [dayLogs, monthLogs, yearLogs];

  return (
    <section>
      <h2>レポート</h2>
      <DateRangeLogs title={title} description={description} logs={logs[rangeNum]} />
    </section>
  );
}
