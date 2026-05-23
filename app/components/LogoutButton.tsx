'use client';

import { logoutAction } from '@/app/actions/auth';

export function LogoutButton() {
  return (
    <form
      action={logoutAction}
      style={{ display: 'inline' }}
    >
      <button
        type="submit"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
      >
        Déconnexion
      </button>
    </form>
  );
}
