'use client';

import ContentPage from '../components/ContentPage';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('About Baitul Mamur')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        {t('Learn more about our history, mission, and the values that guide our community.')}
      </p>
      <ContentPage slug="about-us" />
      {/* TODO: Add more static content, images, or team profiles if needed */}
    </div>
  );
};

export default AboutPage;
