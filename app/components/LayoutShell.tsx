'use client';

import { usePathname } from 'next/navigation';

import Footer from './Footer';
import Header from './Header';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const resolvedPath = pathname ?? '';
  const isWillkommen = resolvedPath.startsWith('/willkommen');

  if (isWillkommen) {
    return <>{children}</>;
  }

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
