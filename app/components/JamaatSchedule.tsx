'use client';

import { useEffect, useMemo, useState } from 'react';

type JamaatSchedule = {
  id: number;
  location: string;
  start_date: string;
  end_date: string;
  fajr: string | null;
  dhuhr: string | null;
  asr: string | null;
  isha: string | null;
  maghrib_offset_minutes: number;
  source: string | null;
};

const formatTime = (value: string | null) => {
  if (!value) return '--:--';
  const parts = value.split(':');
  if (parts.length < 2) return value;
  return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
};

const formatRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return '--';
  }
  const startLabel = startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const endLabel = endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  return `${startLabel} - ${endLabel}`;
};

export default function JamaatSchedule() {
  const [items, setItems] = useState<JamaatSchedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const location = encodeURIComponent('Vienna (1100 - Favoriten)');
      const res = await fetch(`/api/jamaat-schedules?location=${location}`);
      if (!res.ok) return;
      const data = (await res.json()) as JamaatSchedule[];
      setItems(data);
    };
    fetchSchedules();
  }, []);

  const current = useMemo(() => {
    if (!items.length) return null;
    const today = new Date();
    return (
      items.find((schedule) => {
        const start = new Date(`${schedule.start_date}T00:00:00`);
        const end = new Date(`${schedule.end_date}T23:59:59`);
        return start <= today && today <= end;
      }) ?? items[0]
    );
  }, [items]);

  if (!current) {
    return (
      <div className="text-sm text-[#4f5b54]">
        Loading jamaat schedule...
      </div>
    );
  }

  const cards = [
    { label: 'Fajr', value: formatTime(current.fajr) },
    { label: 'Dhuhr', value: formatTime(current.dhuhr) },
    { label: 'Asr', value: formatTime(current.asr) },
    { label: 'Maghrib', value: `Adhan + ${current.maghrib_offset_minutes} min` },
    { label: 'Isha', value: formatTime(current.isha) },
  ];

  return (
    <div className="bg-white border border-[#e6dcc7] rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#c59a2f]">
            Jamaat Schedule
          </p>
          <h3 className="font-display text-2xl text-[#0f6b4f] mt-2">
            Congregational Prayer Times
          </h3>
          <p className="text-sm text-[#4f5b54] mt-2">
            {current.location}
          </p>
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-[#0f6b4f] bg-[#f4efe4] px-4 py-2 rounded-full border border-[#e6dcc7]">
          {formatRange(current.start_date, current.end_date)}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex-1 min-w-[120px] rounded-xl border border-[#efe7d6] bg-[#f9f6ee] px-3 py-4 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#0f6b4f]">
              {card.label}
            </p>
            <p className="mt-2 text-base font-semibold text-[#0f6b4f]">
              {card.value}
            </p>
          </div>
        ))}
      </div>
      {current.source ? (
        <p className="text-xs text-[#8a8174] mt-4">
          Source: {current.source}
        </p>
      ) : null}
    </div>
  );
}
