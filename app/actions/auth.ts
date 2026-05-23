'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Simple validation (in production, you'd check against a real database)
  if (email === 'admin@taskflow.com' && password === 'password123') {
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify({ email, name: 'Admin' }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect('/dashboard');
  }

  return { error: 'Email ou mot de passe incorrect' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
