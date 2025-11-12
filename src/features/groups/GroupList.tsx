import api from '../../services/api';
import { GroupCard } from './GroupCard';

export const GroupList = ({ groups, loading, showJoinButton = false, emptyMessage }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '2rem' }}>⏳</div>
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>Loading groups...</p>
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          {emptyMessage || 'No groups found'}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          showJoinButton={showJoinButton}
        />
      ))}
    </div>
  );
};

export const contributionService = {
  contribute: async (groupId, amount) => {
    const response = await api.post(`/groups/${groupId}/contribute`, { amount });
    return response.data;
  },

  getGroupContributions: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/contributions`);
    return response.data;
  },

  getUserContributions: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/my-contributions`);
    return response.data;
  },
};