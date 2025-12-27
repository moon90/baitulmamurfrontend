'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const links = [
  { label: 'Welcome', href: '/willkommen' },
  { label: 'The Mosque', href: '/about' },
  { label: 'Service', href: '/contact' },
  { label: 'Education & Culture', href: '/education' },
  { label: 'Events', href: '/events' },
  { label: 'Media', href: '/news' },
  { label: 'Social', href: '/contact' },
  { label: 'App', href: '/mobile-app' },
];

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-[#e6dcc7] bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[#e9e2d5] flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-[#8a8174]">
            Logo
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#0f6b4f]">
              BAITUL MAMUR MASJID FAVORITEN
            </p>
            <p className="font-display text-lg text-[#0f6b4f]">
              BAITUL MAMUR MASJID FAVORITEN
            </p>
          </div>
        </div>
        <div className="text-xs text-[#4f5b54] flex flex-wrap gap-4">
          <span>1100 WIEN, SCHEUGASSE 9</span>
          <Link href="/contact" className="uppercase tracking-widest text-[#0f6b4f]">
            Contact
          </Link>
        </div>
      </div>
      <nav className="bg-[#0f6b4f]">
        <div className="container mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 px-4 py-3 text-[12px] uppercase tracking-[0.25em] text-white">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#c59a2f]">
              {t(link.label)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
