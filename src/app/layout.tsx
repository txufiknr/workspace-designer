import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workspace Designer — monis.rent',
  description:
    'Design your dream workspace and rent it. Pick a desk, chair, and accessories — see your setup come to life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
