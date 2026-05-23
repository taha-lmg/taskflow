import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import api from '../api/axios';
import { RootState, AppDispatch } from '../store';
import { logout } from '../features/auth/authSlice';
import { setAuthToken } from '../api/axios';

interface Project {
  id: string;
  name: string;
  color: string;
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!id) return;
        const res = await api.get<Project>(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error('Erreur:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id, navigate]);

  const handleLogout = () => {
    setAuthToken(null);
    dispatch(logout());
  };

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="TaskFlow"
        onMenuClick={() => {}}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <div style={{ padding: '2rem' }}>
        <a href="/dashboard" style={{ color: '#007bff', cursor: 'pointer' }}>
          ← Retour au tableau
        </a>
        {project && (
          <div>
            <h2>{project.name}</h2>
            <p>Couleur: {project.color}</p>
          </div>
        )}
      </div>
    </div>
  );
}
