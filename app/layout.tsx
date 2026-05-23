import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { LogoutButton } from '@/app/components/LogoutButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Manage your projects and tasks with TaskFlow',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const user = session ? JSON.parse(session.value) : null;

  return (
    <html lang="en">
      <body>
        <header style={{ backgroundColor: '#1B8C3E' }} className="text-white">
          <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <nav className="flex gap-6 items-center">
              <Link href="/dashboard" className="hover:opacity-80 transition">
                Projets
              </Link>
              {user ? (
                <div className="flex gap-4 items-center">
                  <span className="text-sm">Bienvenue, {user.name}</span>
                  <LogoutButton />
                </div>
              ) : (
                <Link href="/login" className="hover:opacity-80 transition">
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
