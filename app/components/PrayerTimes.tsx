// components/PrayerTimes.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface PrayerTime {
  id: string;
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const PrayerTimes = () => {
  const { t } = useTranslation(); // Use useTranslation hook
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/prayer-times');
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

  if (loading) return <div className="text-center text-neutral-dark">{t('Loading prayer times...')}</div>;
  if (error) return <div className="text-center text-red-500">{t('Error:')} {error}</div>;

  // Get today's prayer times
  const today = new Date().toISOString().split('T')[0];
  const todayPrayerTime = prayerTimes.find(pt => pt.date.split('T')[0] === today);


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">{t('Today\'s Prayer Times')}</h2>
      {todayPrayerTime ? (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-neutral-dark">
          <div><p className="font-semibold">{t('Fajr')}</p><p>{todayPrayerTime.fajr}</p></div>
          <div><p className="font-semibold">{t('Sunrise')}</p><p>{todayPrayerTime.sunrise}</p></div>
          <div><p className="font-semibold">{t('Dhuhr')}</p><p>{todayPrayerTime.dhuhr}</p></div>
          <div><p className="font-semibold">{t('Asr')}</p><p>{todayPrayerTime.asr}</p></div>
          <div><p className="font-semibold">{t('Maghrib')}</p><p>{todayPrayerTime.maghrib}</p></div>
          <div><p className="font-semibold">{t('Isha')}</p><p>{todayPrayerTime.isha}</p></div>
        </div>
      ) : (
        <p className="text-center text-neutral-dark">{t('No prayer times found for today.')}</p>
      )}
    </div>
  );
};

export default PrayerTimes;