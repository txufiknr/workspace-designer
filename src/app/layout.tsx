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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-background via-background to-surface font-sans text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var dark=t?t==='dark':true;document.documentElement.classList.toggle('dark',dark);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',dark?'#030712':'#F5F5F7');}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
