import { useState } from 'react';
import { withdrawalService } from '../../services/withdrawalService';
import { Button } from '../../components/ui/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const WithdrawalApprovalCard = ({ withdrawal, onApprovalChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    setLoading(true);
    try {
      await withdrawalService.approve(withdrawal.id);
      onApprovalChange?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Are you sure you want to reject this withdrawal?')) return;
    setLoading(true);
    try {
      await withdrawalService.reject(withdrawal.id, 'Rejected by admin');
      onApprovalChange?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold">{withdrawal.userName}</p>
          <p className="text-sm text-gray-600">{formatDate(withdrawal.createdAt)}</p>
        </div>
        <span className="bg-yellow-200 px-2 py-1 rounded text-sm font-medium">Pending</span>
      </div>

      <p className="text-lg font-bold text-yellow-700 mb-2">
        {formatCurrency(withdrawal.amount)}
      </p>

      {withdrawal.reason && (
        <p className="text-sm text-gray-700 mb-3">
          <strong>Reason:</strong> {withdrawal.reason}
        </p>
      )}

      {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}

      <div className="flex gap-2">
        <Button
          onClick={handleApprove}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          Approve
        </Button>
        <Button
          onClick={handleReject}
          disabled={loading}
          variant="danger"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};