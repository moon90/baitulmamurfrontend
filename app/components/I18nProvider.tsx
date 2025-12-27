// app/components/I18nProvider.tsx
'use client';

import { useEffect, useState } from 'react'; // Import useState
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // Import the base i18n configuration
import LanguageDetector from 'i18next-browser-languagedetector'; // Import LanguageDetector

const I18nProvider = ({ children, initialLanguage }: { children: React.ReactNode, initialLanguage: string }) => {
  // Use a state to track if i18n is ready for client-side detection
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    if (i18n.language !== initialLanguage) {
      i18n.changeLanguage(initialLanguage);
    }

    // Only use LanguageDetector on the client
    if (!(i18n as any).browserDetected) { // Add a custom flag to i18n instance
      i18n.use(LanguageDetector);
      i18n.init({
        ...i18n.options,
        detection: {
          order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
          caches: ['cookie'],
        },
      }).then(() => {
        (i18n as any).browserDetected = true; // Mark as detected
        setI18nReady(true);
      });
    } else {
      setI18nReady(true);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
