import { useState, useEffect } from 'react'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import MainContent from './components/MainContent'; 
import { useAuth } from './features/auth/AuthContext'; 
import { Login } from './features/auth/Login'; 
  
interface Project { id: string; name: string; color: string; } 
interface Column { id: string; title: string; tasks: string[]; } 
  
function Dashboard() { 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [projects, setProjects] = useState<Project[]>([]); 
  const [columns, setColumns] = useState<Column[]>([]); 
  const [loading, setLoading] = useState(true); 
  const { state, dispatch } = useAuth();
  
  useEffect(() => { 
    async function fetchData() { 
      try { 
        const [projRes, colRes] = await Promise.all([ 
          fetch('http://localhost:4000/projects'), 
          fetch('http://localhost:4000/columns'), 
        ]); 
        setProjects(await projRes.json()); 
        setColumns(await colRes.json()); 
      } catch (error) { 
        console.error('Erreur:', error); 
      } finally { 
        setLoading(false); 
      } 
    } 
    fetchData(); 
  }, []);  // [] = une seule fois au montage 
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  if (loading) return <div style={{padding:'2rem'}}>Chargement...</div>; 
  
  return ( 
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> 
      <Header 
        title="TaskFlow" 
        onMenuClick={() => setSidebarOpen(p => !p)} 
        userName={state.user?.name} 
        onLogout={handleLogout}
      /> 
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}> 
        <Sidebar projects={projects} isOpen={sidebarOpen} /> 
        <MainContent columns={columns} /> 
      </div> 
    </div> 
  ); 
} 

export default function App() { 
  const { state } = useAuth();
  
  if (state.user === null) {
    return <Login />;
  }
  
  return <Dashboard />;
} 