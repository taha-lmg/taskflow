import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import { useProjects } from '../hooks/useProjects';
import { RootState, AppDispatch } from '../store';
import { logout } from '../features/auth/authSlice';
import { setAuthToken } from '../api/axios';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { projects, columns, loading, addProject, renameProject, deleteProject } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleLogout = () => {
    setAuthToken(null);
    dispatch(logout());
  };

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
        userName={user?.name}
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
              onSubmit={async (name, color) => {
                await addProject(name, color);
                setShowForm(false);
              }}
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
