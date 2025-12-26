'use client';

import { useTranslation } from 'react-i18next';
import EventsList from '../components/EventsList'; // Import EventsList component

export default function EventsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-5xl font-extrabold text-neutral-dark mb-10 text-center">
        {t('Upcoming Events')}
      </h1>
      <EventsList /> {/* Displays all events */}
    </div>
  );
}
