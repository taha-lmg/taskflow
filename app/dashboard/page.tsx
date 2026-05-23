import Link from 'next/link';

export default async function Dashboard() {
  const response = await fetch('http://localhost:4000/projects', {
    cache: 'no-store',
  });

  const projects = await response.json();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Mes Projets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color || '#ccc' }}
                />
                <h2 className="text-xl font-semibold">{project.name}</h2>
              </div>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
