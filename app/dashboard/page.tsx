import Link from 'next/link';
import { AddProjectForm } from '@/app/dashboard/AddProjectForm';
import { deleteProject } from '@/app/actions/projects';

export default async function Dashboard() {
  const response = await fetch('http://localhost:3000/api/projects', {
    cache: 'no-store',
  });

  const projects = await response.json();

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Mes Projets</h1>

      <AddProjectForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div key={project.id} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-3 mb-2 cursor-pointer hover:opacity-80">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color || '#ccc' }}
                />
                <h2 className="text-xl font-semibold">{project.name}</h2>
              </div>
            </Link>
            {project.description && (
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
            )}
            <form
              action={deleteProject}
              style={{ display: 'inline' }}
              onSubmit={(e) => {
                if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
                  e.preventDefault();
                }
              }}
            >
              <input type="hidden" name="id" value={project.id} />
              <button
                type="submit"
                className="text-red-600 hover:text-red-800 text-sm font-semibold"
              >
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
