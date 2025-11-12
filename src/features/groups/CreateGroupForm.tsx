import { useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const CreateGroupForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAmount: '',
  });
  const [error, setError] = useState('');
  const { createGroup, loading } = useGroups();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (parseFloat(formData.targetAmount) <= 0) {
      setError('Target amount must be greater than 0');
      return;
    }

    try {
      const newGroup = await createGroup({
        name: formData.name,
        description: formData.description,
        targetAmount: parseFloat(formData.targetAmount),
      });
      onSuccess?.(newGroup);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create group');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      <Input
        label="Group Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., Family Vacation Fund"
        required
      />

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="What are you saving for?"
        required
      />

      <Input
        label="Target Amount ($)"
        type="number"
        name="targetAmount"
        value={formData.targetAmount}
        onChange={handleChange}
        placeholder="e.g., 5000"
        required
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Creating...' : 'Create Group'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} fullWidth>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};