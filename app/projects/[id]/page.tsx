import Link from 'next/link';

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Projet non trouvé</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline mt-4">
          Retour aux projets
        </Link>
      </main>
    );
  }

  const project = await response.json();

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <Link
        href="/dashboard"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Retour aux projets
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: project.color || '#ccc' }}
        />
        <h1 className="text-3xl font-bold">{project.name}</h1>
      </div>

      {project.description && (
        <p className="text-gray-600 mb-6">{project.description}</p>
      )}
    </main>
  );
}
