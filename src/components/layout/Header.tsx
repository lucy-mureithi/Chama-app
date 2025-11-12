import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          💰 Chama App
        </Link>

        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
          <Link to="/groups" style={{ color: 'white', textDecoration: 'none' }}>
            Groups
          </Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
            Profile
          </Link>
        </nav>

        <div>
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span>{user.name}</span>
              <button onClick={logout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" style={{ color: 'white', textDecoration: 'none' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};