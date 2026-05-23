'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';

export default function Login() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>

        {state?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="admin@taskflow.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="password123"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {pending ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Démo: admin@taskflow.com / password123
        </p>
      </div>
    </main>
  );
}
