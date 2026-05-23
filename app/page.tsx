export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur TaskFlow</h1>
      <p className="text-lg text-gray-600 mb-6">
        Gérez vos projets et tâches efficacement avec TaskFlow.
      </p>
      <a
        href="/login"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Se connecter
      </a>
    </main>
  );
}
