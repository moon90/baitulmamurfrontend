'use client';

import PrayerTimes from '../components/PrayerTimes';
import { useTranslation } from 'react-i18next';

const PrayerTimesPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('Daily Prayer Times')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        {t('Stay connected to your faith with our accurate daily prayer times. Please note that times may vary slightly based on your exact location.')}
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <PrayerTimes />
      </div>
      {/* TODO: Add more information like monthly prayer times, or a map for location */}
    </div>
  );
};

export default PrayerTimesPage;
