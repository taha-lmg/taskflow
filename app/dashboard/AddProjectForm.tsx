'use client';

import { addProject } from '@/app/actions/projects';
import { SubmitButton } from '@/app/components/SubmitButton';

export function AddProjectForm() {
  return (
    <form action={addProject} className="mb-8 p-6 bg-white border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Ajouter un projet</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
          Nom du projet
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">
          Couleur
        </label>
        <input
          id="color"
          name="color"
          type="color"
          defaultValue="#1B8C3E"
          className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
