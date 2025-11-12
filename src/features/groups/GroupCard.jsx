import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useGroups } from '../../hooks/useGroups';
import { useAuth } from '../../hooks/useAuth';

export const GroupCard = ({ group, showJoinButton = false }) => {
  const navigate = useNavigate();
  const { joinGroup, loading } = useGroups();
  const { user } = useAuth();

  const handleJoin = async (e) => {
    e.stopPropagation();
    try {
      await joinGroup(group.id);
      // Optional: Show success message
    } catch (err) {
      // Error is handled in context
    }
  };

  const handleViewDetails = () => {
    navigate(`/groups/${group.id}`);
  };

  const isMember = group.members?.some((m) => m.id === user?.id);

  return (
    <Card style={{ cursor: 'pointer' }} onClick={handleViewDetails}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          {group.name}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {group.description}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <ProgressBar
          current={group.currentAmount || 0}
          target={group.targetAmount}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280',
        }}
      >
        <span>👥 {group.memberCount || group.members?.length || 0} members</span>
        <span>Created by {group.creatorName || 'Admin'}</span>
      </div>

      {showJoinButton && !isMember && (
        <div style={{ marginTop: '1rem' }}>
          <Button
            onClick={handleJoin}
            disabled={loading}
            fullWidth
            variant="success"
          >
            {loading ? 'Joining...' : 'Join Group'}
          </Button>
        </div>
      )}

      {isMember && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            textAlign: 'center',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          ✓ You're a member
        </div>
      )}
    </Card>
  );
};