import { useState } from 'react';
import { withdrawalService } from '../../services/withdrawalService';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const WithdrawalRequestForm = ({ groupId, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await withdrawalService.request(groupId, {
        amount: parseFloat(amount),
        reason,
      });
      setAmount('');
      setReason('');
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to request withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Request Withdrawal</h3>
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
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Why do you need this withdrawal?"
          rows="3"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Requesting...' : 'Request Withdrawal'}
      </Button>
    </form>
  );
};