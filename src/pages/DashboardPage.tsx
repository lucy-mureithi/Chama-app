import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GroupList } from '../features/groups/GroupList';

export const DashboardPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { groups } = useGroups();

  if (authLoading) {
    return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
  }

  if (!user) {
    return <div style={{ padding: '2rem' }}>Please log in first</div>;
  }

  const totalSaved = groups.reduce((sum, group) => sum + group.totalSaved, 0);
  const activeGroups = groups.length;

  return (
    <div>
      <h1>Welcome, {user.name}! 👋</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <Card>
          <h3>Total Saved</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
            ${totalSaved.toLocaleString()}
          </p>
        </Card>

        <Card>
          <h3>Active Groups</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
            {activeGroups}
          </p>
        </Card>

        <Card>
          <h3>Pending Withdrawals</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
            1
          </p>
        </Card>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Card>
          <h3>Your Groups</h3>
          {groups.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {groups.map((group) => (
                <li key={group.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>{group.name}</strong> - ${group.totalSaved} saved
                </li>
              ))}
            </ul>
          ) : (
            <p>No groups yet. Create or join a group to get started!</p>
          )}
        </Card>
      </div>
    </div>
  );
};
