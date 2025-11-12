import { ReactNode } from 'react';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header />
      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  );
};