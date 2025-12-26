'use client'; // Mark as client component

import { useTranslation } from 'react-i18next';
import NewsList from '../components/NewsList'; // Import NewsList component

export default function NewsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-5xl font-extrabold text-neutral-dark mb-10 text-center">
        {t('Aktuelles & News')}
      </h1>
      <NewsList /> {/* Displays all news articles */}
    </div>
  );
}