// components/PrayerTimes.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface PrayerTime {
  id: string;
  prayer_date: string;
  location: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const formatTime = (value: string) => {
  if (!value) return value;
  const parts = value.split(':');
  if (parts.length < 2) return value;
  return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
};

const PrayerTimes = () => {
  const { t } = useTranslation(); // Use useTranslation hook
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch('/api/prayer-times?location=Vienna');
        if (!res.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        const data = await res.json();
        setPrayerTimes(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-neutral-dark" suppressHydrationWarning>
        {t('Loading prayer times...')}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500" suppressHydrationWarning>
        {t('Error:')} {error}
      </div>
    );
  }

  // Get today's prayer times
  const today = new Date().toISOString().split('T')[0];
  const todayPrayerTime = prayerTimes.find(pt => pt.prayer_date.split('T')[0] === today);


  return (
    <div className="font-sans">
      <div className="flex items-center justify-end mb-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c59a2f]">
          {today}
        </span>
      </div>
      {todayPrayerTime ? (
        <div className="flex flex-wrap gap-3 text-center text-[#1f2b24]">
          {[
            { label: t('Fajr'), value: formatTime(todayPrayerTime.fajr) },
            { label: t('Sunrise'), value: formatTime(todayPrayerTime.sunrise) },
            { label: t('Dhuhr'), value: formatTime(todayPrayerTime.dhuhr) },
            { label: t('Asr'), value: formatTime(todayPrayerTime.asr) },
            { label: t('Maghrib'), value: formatTime(todayPrayerTime.maghrib) },
            { label: t('Isha'), value: formatTime(todayPrayerTime.isha) },
          ].map((item) => (
            <div
              key={item.label}
              className="flex-1 min-w-[120px] rounded-xl border border-[#efe7d6] bg-[#f9f6ee] px-2 py-3 shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#0f6b4f]">
                {item.label}
              </p>
              <p className="mt-2 text-base font-semibold text-[#0f6b4f] tabular-nums whitespace-nowrap">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#4f5b54]">{t('No prayer times found for today.')}</p>
      )}
    </div>
  );
};

export default PrayerTimes;
