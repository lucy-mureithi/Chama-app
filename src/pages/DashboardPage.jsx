import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GroupList } from '../features/groups/GroupList';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { myGroups, fetchMyGroups, loading } = useGroups();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyGroups();
  }, [fetchMyGroups]);

  const totalSaved = myGroups.reduce((sum, group) => sum + (group.currentAmount || 0), 0);
  const totalTarget = myGroups.reduce((sum, group) => sum + group.targetAmount, 0);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p style={{ color: '#6b7280' }}>
          Here's an overview of your savings groups
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <Card>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Total Groups
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
            {myGroups.length}
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Total Saved
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
            ${totalSaved.toLocaleString()}
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Total Target
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b7280' }}>
            ${totalTarget.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button onClick={() => navigate('/groups')}>View All Groups</Button>
        <Button variant="secondary" onClick={() => navigate('/groups?action=create')}>
          Create New Group
        </Button>
      </div>

      {/* My Groups */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          My Groups
        </h2>
        <GroupList
          groups={myGroups}
          loading={loading}
          emptyMessage="You haven't joined any groups yet. Browse available groups to get started!"
        />
      </div>
    </div>
  );
};
