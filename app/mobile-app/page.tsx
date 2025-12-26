// BaitulMamur-Frontend/app/mobile-app/page.tsx
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const MobileAppPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('Baitul Mamur Mobile App')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
        {t('Stay connected with Baitul Mamur wherever you are! Our upcoming mobile app will bring all the features of our community directly to your fingertips.')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="text-center">
          <img src="https://via.placeholder.com/400x700/008000/FFFFFF?text=App+Screenshot+1" alt="App Screenshot 1" className="mx-auto rounded-lg shadow-xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('Features at a Glance')}</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>{t('Accurate Prayer Times with Notifications')}</li>
            <li>{t('Live Streams of Khutbahs and Lectures')}</li>
            <li>{t('Access to Educational Programs')}</li>
            <li>{t('Ask the Imam Service')}</li>
            <li>{t('Event Calendar and Reminders')}</li>
            <li>{t('Donation & Zakat Facilities')}</li>
          </ul>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('Download the App')}</h2>
        <p className="text-lg text-gray-700 mb-6">
          {t('The Baitul Mamur mobile app will be available soon on both iOS and Android platforms.')}
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="#" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg transition-colors duration-200">
            {t('App Store')}
          </Link>
          <Link href="#" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg transition-colors duration-200">
            {t('Google Play')}
          </Link>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('Stay Updated!')}</h2>
        <p className="text-lg text-gray-700">
          {t('Sign up for our newsletter to be notified when the app launches and get exclusive early access.')}
        </p>
        {/* TODO: Add a newsletter signup form here */}
      </div>
    </div>
  );
};

export default MobileAppPage;
