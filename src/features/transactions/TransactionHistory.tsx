import { useState, useEffect } from 'react';
import { groupService } from '../../services/groupService';
import { Table } from '../../components/ui/Table';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const TransactionHistory = ({ groupId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [groupId]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await groupService.getTransactions(groupId);
      setTransactions(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'type',
      label: 'Type',
      render: (type) => (
        <span className={`px-2 py-1 rounded text-sm ${
          type === 'contribution' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      ),
    },
    {
      key: 'userName',
      label: 'User',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (amount) => formatCurrency(amount),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (date) => formatDate(date),
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-sm ${
          status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
  ];

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
      <Table columns={columns} data={transactions} loading={loading} />
    </div>
  );
};