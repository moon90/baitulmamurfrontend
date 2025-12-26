'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header>
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 text-white p-2 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold">Islamic Center Vienna</span>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-green-400">{t('Welcome')}</Link>
            <Link href="/mosque" className="hover:text-green-400">{t('The Mosque')}</Link>
            <Link href="/contact" className="hover:text-green-400">{t('Contact')}</Link>
            <Link href="/service" className="hover:text-green-400">{t('Service')}</Link>
            <Link href="/education" className="hover:text-green-400">{t('Education & Culture')}</Link>
            <Link href="/events" className="hover:text-green-400">{t('Events')}</Link>
            <Link href="/media" className="hover:text-green-400">{t('Media')}</Link>
            <Link href="/social" className="hover:text-green-400">{t('Social')}</Link>
            <Link href="/app" className="hover:text-green-400">{t('App')}</Link>
          </div>
        </div>
      </nav>

      {/* Main Header Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/IZW.png')" }} // Assuming main.png is in public folder
      >
        <div className="absolute inset-0 bg-green-900 opacity-70"></div> {/* Green Overlay */}
        <div className="relative z-10 text-center">
          <Image src="/goe.png" alt="IZW Logo" width={100} height={100} className="mx-auto mb-4" /> {/* Assuming goe.png is the IZW logo */}
          <p className="text-4xl font-arabic mb-2">المركز الإسلامي بفيينا</p>
          <p className="text-xl">ISLAMISCHES ZENTRUM WIEN</p>
        </div>
      </div>
    </header>
  );
}