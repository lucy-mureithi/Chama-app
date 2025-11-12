import { useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ContributeForm = ({ groupId, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { contribute } = useGroups();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await contribute(groupId, parseFloat(amount));
      setAmount('');
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to contribute');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Make a Contribution</h3>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <Input
        label="Amount"
        type="number"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Contributing...' : 'Contribute'}
      </Button>
    </form>
  );
};