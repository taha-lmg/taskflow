import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface Column {
  id: string;
  title: string;
  tasks: string[];
}

interface UseProjectsReturn {
  projects: Project[];
  columns: Column[];
  loading: boolean;
  error: string | null;
  addProject: (name: string, color: string) => Promise<void>;
  renameProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          api.get<Project[]>('/projects'),
          api.get<Column[]>('/columns'),
        ]);
        setProjects(projRes.data);
        setColumns(colRes.data);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addProject = useCallback(
    async (name: string, color: string) => {
      try {
        const res = await api.post<Project>('/projects', { name, color });
        setProjects((prev) => [...prev, res.data]);
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to add project';
        setError(errorMsg);
        console.error('Erreur lors de l\'ajout du projet:', err);
      }
    },
    []
  );

  const renameProject = useCallback(
    async (id: string) => {
      const newName = prompt('Nouveau nom du projet:');
      if (newName) {
        try {
          const res = await api.put<Project>(`/projects/${id}`, { name: newName });
          setProjects((prev) =>
            prev.map((p) => (p.id === id ? res.data : p))
          );
          setError(null);
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Failed to rename project';
          setError(errorMsg);
          console.error('Erreur lors du renommage:', err);
        }
      }
    },
    []
  );

  const deleteProject = useCallback(
    async (id: string) => {
      if (confirm('Êtes-vous sûr?')) {
        try {
          await api.delete(`/projects/${id}`);
          setProjects((prev) => prev.filter((p) => p.id !== id));
          setError(null);
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Failed to delete project';
          setError(errorMsg);
          console.error('Erreur lors de la suppression:', err);
        }
      }
    },
    []
  );

  return {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject,
    deleteProject,
  };
}
