import styles from './Header.module.css'; 
  
interface HeaderProps { 
  title: string; 
  onMenuClick: () => void; 
  userName?: string; 
  onLogout?: () => void; 
} 
  
export default function Header({ title, onMenuClick, userName, onLogout }: HeaderProps) { 
  return ( 
    <header className={styles.header}> 
      <div className={styles.left}> 
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button> 
        <h1 className={styles.logo}>{title}</h1> 
      </div> 
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {userName && <span className={styles.avatar}>{userName}</span>}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Déconnexion
          </button>
        )}
      </div> 
    </header> 
  ); 
} 