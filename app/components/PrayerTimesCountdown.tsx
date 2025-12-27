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

type Countdown = {
  label: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const PRAYER_ORDER: Array<{ key: keyof PrayerTime; label: string }> = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'sunrise', label: 'Sunrise' },
  { key: 'dhuhr', label: 'Dhuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
];

function toDateTime(dateStr: string, timeStr: string): Date {
  const datePart = dateStr.split('T')[0];
  const timePart = timeStr.length === 5 ? `${timeStr}:00` : timeStr;
  return new Date(`${datePart}T${timePart}`);
}

function formatCountdown(ms: number): Countdown {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    label: '',
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export default function PrayerTimesCountdown() {
  const [times, setTimes] = useState<PrayerTime[]>([]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const fetchTimes = async () => {
      const res = await fetch('/api/prayer-times?location=Vienna');
      if (!res.ok) return;
      const data = (await res.json()) as PrayerTime[];
      setTimes(data);
    };
    fetchTimes();
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const countdown = useMemo(() => {
    if (!times.length) {
      return null;
    }

    const todayKey = now.toISOString().split('T')[0];
    const sorted = [...times].sort((a, b) => a.prayer_date.localeCompare(b.prayer_date));
    const todayIndex = sorted.findIndex((pt) => pt.prayer_date.split('T')[0] === todayKey);
    const today = todayIndex >= 0 ? sorted[todayIndex] : null;

    const checkList: Array<{ label: string; time: Date }> = [];
    if (today) {
      for (const prayer of PRAYER_ORDER) {
        checkList.push({
          label: prayer.label,
          time: toDateTime(today.prayer_date, String(today[prayer.key])),
        });
      }
    }

    const upcoming = checkList.find((item) => item.time > now);
    if (upcoming) {
      const next = formatCountdown(upcoming.time.getTime() - now.getTime());
      return { ...next, label: upcoming.label };
    }

    const nextDay = sorted[todayIndex + 1] ?? sorted[0];
    if (!nextDay) return null;
    const nextTime = toDateTime(nextDay.prayer_date, nextDay.fajr);
    const next = formatCountdown(nextTime.getTime() - now.getTime());
    return { ...next, label: 'Fajr' };
  }, [now, times]);

  if (!countdown) {
    return (
      <div className="text-sm text-[#4f5b54]">
        Loading prayer countdown...
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
        Next Prayer
      </p>
      <h3 className="font-display text-xl text-white mt-2">
        {countdown.label}
      </h3>
      <div className="mt-4 flex items-center justify-center gap-3 text-white">
        <div className="bg-white/10 rounded-md px-3 py-2">
          <div className="text-2xl font-semibold">{countdown.hours}</div>
          <div className="text-[10px] uppercase tracking-widest">Hours</div>
        </div>
        <div className="bg-white/10 rounded-md px-3 py-2">
          <div className="text-2xl font-semibold">{countdown.minutes}</div>
          <div className="text-[10px] uppercase tracking-widest">Minutes</div>
        </div>
        <div className="bg-white/10 rounded-md px-3 py-2">
          <div className="text-2xl font-semibold">{countdown.seconds}</div>
          <div className="text-[10px] uppercase tracking-widest">Seconds</div>
        </div>
      </div>
    </div>
  );
}
