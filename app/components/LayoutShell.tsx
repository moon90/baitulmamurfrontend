'use client';

import { usePathname } from 'next/navigation';

import Footer from './Footer';
import Header from './Header';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
