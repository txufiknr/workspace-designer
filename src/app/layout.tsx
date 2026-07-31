import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Workspace Designer — monis.rent',
  description:
    'Design your dream workspace and rent it. Pick a desk, chair, and accessories — see your setup come to life.',
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
