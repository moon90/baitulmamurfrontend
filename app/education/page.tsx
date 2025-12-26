'use client';

import EducationalPrograms from '../components/EducationalPrograms';
import { useTranslation } from 'react-i18next';

const EducationPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('Our Educational Programs')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        {t('We offer a variety of educational programs for all age groups, designed to deepen understanding of Islam and foster personal growth. Explore our current offerings below.')}
      </p>
      <EducationalPrograms />
    </div>
  );
};

export default EducationPage;
