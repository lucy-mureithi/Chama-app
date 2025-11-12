import { Header } from './Header';
import { useAuth } from '../../hooks/useAuth';

export const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div style={styles.wrapper}>
      {user && <Header />}
      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
};