// BaitulMamur-Frontend/app/components/VirtualTourViewer.tsx
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

interface VirtualTourViewerProps {
  tourUrl?: string; // URL of an embedded 3D tour (e.g., Matterport, Google Street View Embed)
}

const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({ tourUrl }) => {
  const { t } = useTranslation();

  if (!tourUrl) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{t('Virtual Tour Coming Soon!')}</h2>
        <p className="text-gray-700">
          {t('We are working on bringing you an immersive 3D virtual tour of Baitul Mamur. Please check back soon!')}
        </p>
        <p className="mt-4 text-sm text-gray-500">
          {t('Developers: Integrate your 3D library (e.g., Three.js) or embed a third-party tour here.')}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={tourUrl}
        style={{ border: 'none' }}
        height="100%"
        width="100%"
        allowFullScreen={true}
        title="Baitul Mamur Virtual Tour"
      ></iframe>
    </div>
  );
};

export default VirtualTourViewer;
