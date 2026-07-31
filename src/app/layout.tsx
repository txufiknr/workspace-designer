import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { APP_DESCRIPTION, APP_NAME, APP_URL, BRAND_NAME } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${BRAND_NAME}`,
    template: `%s — ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: `${APP_NAME} — ${BRAND_NAME}`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-950 to-surface font-sans text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
