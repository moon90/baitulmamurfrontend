// app/layout.tsx
import './globals.css';
import I18nProvider from './components/I18nProvider';
import LayoutShell from './components/LayoutShell';
import { headers } from 'next/headers'; // Import headers

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const headersList = headers(); // Temporarily commented out headers call
  // const acceptLanguage = headersList['accept-language'] || 'en';
  // const initialLanguage = acceptLanguage.split(',')[0].split('-')[0];

  const initialLanguage = 'en'; // Hardcode for testing

  return (
    <html lang={initialLanguage}>
      <body className="flex flex-col min-h-screen font-sans"> {/* Added font-sans */}
        <I18nProvider initialLanguage={initialLanguage}>
          <LayoutShell>
            {children}
          </LayoutShell>
        </I18nProvider>
      </body>
    </html>
  );
}
