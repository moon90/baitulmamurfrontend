'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Footer = () => {
  const { t } = useTranslation(); // Use useTranslation hook

  return (
    <footer className="bg-neutral-dark text-neutral py-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Section 1: Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('Islamisches Zentrum Wien')}</h3>
            <p className="text-sm">{t('Am Bruckhaufen 3')}</p>
            <p className="text-sm">{t('1210 Wien')}</p>
            <p className="text-sm">{t('office@islamiccentre.at')}</p>
            <p className="text-sm">{t('+43 1 2933194')}</p>
          </div>

          {/* Section 2: App Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('IZW Apps')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral hover:text-white transition-colors duration-200 text-sm">
                  {t('Android App')} - v1.14
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral hover:text-white transition-colors duration-200 text-sm">
                  {t('iPhone App')} - v1.16
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Social Media & Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('Follow Us')}</h3>
            <div className="flex space-x-4 mb-4">
              {/* Replace with actual social media icons/links and SVGs */}
              <a href="#" className="text-neutral hover:text-accent transition-colors duration-200">Facebook</a>
              <a href="#" className="text-neutral hover:text-accent transition-colors duration-200">Instagram</a>
              <a href="#" className="text-neutral hover:text-accent transition-colors duration-200">YouTube</a>
              <a href="#" className="text-neutral hover:text-accent transition-colors duration-200">Twitter/X</a>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('Quick Links')}</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-neutral hover:text-white transition-colors duration-200 text-sm">{t('Privacy Policy')}</Link></li>
              <li><Link href="/imprint" className="text-neutral hover:text-white transition-colors duration-200 text-sm">{t('Impressum')}</Link></li>
            </ul>
          </div>

          {/* Section 4: Mission/About - Placeholder */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('Our Mission')}</h3>
            <p className="text-sm">
              {t('Dedicated to fostering a vibrant and inclusive Muslim community in Vienna. Providing spiritual guidance, education, and social support.')}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t('Islamisches Zentrum Wien')}. {t('All rights reserved.')} - {t('Made by MASJID•X')}</p>
          {/* Placeholder for cookie policy if needed based on izwien.at */}
          <p className="mt-2 text-xs">{t('This site uses cookies from Google to deliver its services and to analyze traffic.')} <a href="#" className="underline">{t('Cookie Policy')}</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
