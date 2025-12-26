// BaitulMamur-Frontend/app/virtual-tour/page.tsx
'use client';

import React from 'react';
import VirtualTourViewer from '../components/VirtualTourViewer';
import { useTranslation } from 'react-i18next';

const VirtualTourPage = () => {
  const { t } = useTranslation();

  // For demonstration, you can provide a dummy or placeholder URL.
  // In a real application, this might come from an API or configuration.
  const dummyTourUrl = "https://my.matterport.com/show/?m=your_matterport_id"; // Example Matterport embed URL

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('Virtual Tour')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        {t('Explore Baitul Mamur virtually from anywhere in the world. Immerse yourself in our beautiful mosque.')}
      </p>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {/* Pass the tourUrl if you have one, otherwise it will show the "Coming Soon" message */}
        <VirtualTourViewer tourUrl={""} /> {/* Leaving tourUrl empty to show "Coming Soon" */}
      </div>
    </div>
  );
};

export default VirtualTourPage;
