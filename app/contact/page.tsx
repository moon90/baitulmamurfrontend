'use client';

import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm'; // Import ContactForm component

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c59a2f]">
          {t('Get in touch')}
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-dark mt-3">
          {t('Contact Us')}
        </h1>
        <p className="text-sm text-[#4f5b54] mt-4">
          {t('We are here to answer your questions and support your needs.')}
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <ContactForm />
        <div className="bg-white border border-[#e6dcc7] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0f6b4f]">
            {t('Contact Details')}
          </h2>
          <div className="mt-4 space-y-3 text-sm text-[#4f5b54]">
            <p>
              <span className="uppercase tracking-[0.2em] text-[#0f6b4f] text-[11px]">
                {t('Address')}
              </span>
              <br />
              1100 Wien, Scheugasse 9
            </p>
            <p>
              <span className="uppercase tracking-[0.2em] text-[#0f6b4f] text-[11px]">
                {t('Phone')}
              </span>
              <br />
              +43 1 2933194
            </p>
            <p>
              <span className="uppercase tracking-[0.2em] text-[#0f6b4f] text-[11px]">
                {t('Email')}
              </span>
              <br />
              office@baitulmamur.at
            </p>
          </div>
          <div className="mt-6 rounded-xl bg-[#f4efe4] p-4 text-xs text-[#4f5b54]">
            {t('You can also reach us during office hours for appointments and guidance.')}
          </div>
        </div>
      </div>
    </div>
  );
}
