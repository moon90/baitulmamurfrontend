'use client';

import { useEffect, useMemo, useState } from 'react';

type PrayerTime = {
  id: string;
  prayer_date: string;
  location: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

const columns = [
  { key: 'prayer_date', label: 'Date' },
  { key: 'fajr', label: 'Fajr' },
  { key: 'sunrise', label: 'Sunrise' },
  { key: 'dhuhr', label: 'Dhuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
] as const;

function formatDateLabel(value: string) {
  const dateOnly = value.split('T')[0];
  const date = new Date(`${dateOnly}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateOnly;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

export default function PrayerTimesTable() {
  const [times, setTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimes = async () => {
      const res = await fetch('/api/prayer-times?location=Vienna');
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = (await res.json()) as PrayerTime[];
      setTimes(data);
      setLoading(false);
    };
    fetchTimes();
  }, []);

  const rows = useMemo(() => {
    if (!times.length) return [];
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    return times
      .filter((item) => {
        const dateOnly = item.prayer_date.split('T')[0];
        const date = new Date(`${dateOnly}T00:00:00`);
        return date.getFullYear() === year && date.getMonth() === month;
      })
      .sort((a, b) => a.prayer_date.localeCompare(b.prayer_date));
  }, [times]);

  if (loading) {
    return (
      <div className="text-sm text-[#4f5b54]">
        Loading monthly prayer times...
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="text-sm text-[#4f5b54]">
        No prayer times found for this month.
      </div>
    );
  }

  const todayKey = new Date().toISOString().split('T')[0];

  return (
    <div className="overflow-hidden rounded-xl border border-[#0f6b4f]/30 bg-white shadow-sm">
      <div className="bg-[#0f6b4f] text-white text-sm px-4 py-3 uppercase tracking-widest">
        Monthly Prayer Times
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#e9e2d5] text-[#0f6b4f]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2 text-left uppercase tracking-wider text-xs">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isToday = row.prayer_date.split('T')[0] === todayKey;
              return (
                <tr
                  key={row.id}
                  className={isToday ? 'bg-[#0f6b4f]/10' : 'border-t border-[#e6dcc7]'}
                >
                  <td className="px-4 py-2 font-medium">
                    {formatDateLabel(row.prayer_date)}
                  </td>
                  <td className="px-4 py-2">{row.fajr}</td>
                  <td className="px-4 py-2">{row.sunrise}</td>
                  <td className="px-4 py-2">{row.dhuhr}</td>
                  <td className="px-4 py-2">{row.asr}</td>
                  <td className="px-4 py-2">{row.maghrib}</td>
                  <td className="px-4 py-2">{row.isha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
