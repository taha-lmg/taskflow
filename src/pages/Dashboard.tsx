import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import api from '../api/axios';
import { useAuth } from '../features/auth/AuthContext';
import styles from './Dashboard.module.css';

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

export function Dashboard() {
  const { state, dispatch } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          api.get<Project[]>('/projects'),
          api.get<Column[]>('/columns'),
        ]);
        setProjects(projRes.data);
        setColumns(colRes.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addProject = async (name: string, color: string) => {
    try {
      const res = await api.post<Project>('/projects', { name, color });
      setProjects([...projects, res.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet:', error);
    }
  };

  const renameProject = async (id: string) => {
    const newName = prompt('Nouveau nom du projet:');
    if (newName) {
      try {
        const res = await api.put<Project>(`/projects/${id}`, { name: newName });
        setProjects(projects.map(p => p.id === id ? res.data : p));
      } catch (error) {
        console.error('Erreur lors du renommage:', error);
      }
    }
  };

  const deleteProject = async (id: string) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
        userName={state.user?.name}
        onLogout={handleLogout}
      />
      <div className={styles.body}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <button
              className={styles.addBtn}
              onClick={() => setShowForm(!showForm)}
              disabled={showForm}
            >
              + Nouveau projet
            </button>
          </div>
          {showForm && (
            <ProjectForm
              onSubmit={addProject}
              onCancel={() => setShowForm(false)}
              submitLabel="Créer"
            />
          )}
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}
