import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Manage your projects and tasks with TaskFlow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ backgroundColor: '#1B8C3E' }} className="text-white">
          <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <nav className="flex gap-6">
              <Link href="/dashboard" className="hover:opacity-80 transition">
                Projets
              </Link>
              <Link href="/login" className="hover:opacity-80 transition">
                Connexion
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
