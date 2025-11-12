import { useEffect, useState } from 'react';
import { useGroups } from '../hooks/useGroups';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { GroupList } from '../features/groups/GroupList';
import { CreateGroupForm } from '../features/groups/CreateGroupForm';

export const GroupsPage = () => {
  const { groups, fetchGroups, loading } = useGroups();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    fetchGroups(); // Refresh list
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Savings Groups
        </h1>
        <Button onClick={() => setShowCreateModal(true)}>
          + Create Group
        </Button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #e5e7eb',
        }}
      >
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'all' ? '2px solid #2563eb' : 'none',
            color: activeTab === 'all' ? '#2563eb' : '#6b7280',
            fontWeight: activeTab === 'all' ? '600' : 'normal',
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          All Groups
        </button>
        <button
          onClick={() => setActiveTab('my')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'my' ? '2px solid #2563eb' : 'none',
            color: activeTab === 'my' ? '#2563eb' : '#6b7280',
            fontWeight: activeTab === 'my' ? '600' : 'normal',
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          My Groups
        </button>
      </div>

      {/* Group List */}
      <GroupList
        groups={groups}
        loading={loading}
        showJoinButton={activeTab === 'all'}
        emptyMessage={
          activeTab === 'all'
            ? 'No groups available yet. Be the first to create one!'
            : "You haven't joined any groups yet."
        }
      />

      {/* Create Group Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Savings Group"
      >
        <CreateGroupForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>
    </div>
  );
};