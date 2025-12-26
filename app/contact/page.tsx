'use client';

import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm'; // Import ContactForm component

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-5xl font-extrabold text-neutral-dark mb-10 text-center">
        {t('Contact Us')}
      </h1>
      <ContactForm />
    </div>
  );
}
