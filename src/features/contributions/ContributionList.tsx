import { useState, useEffect } from 'react';
import { contributionService } from '../../services/contributionService';
import { ContributionCard } from './ContributionCard';

export const ContributionList = ({ groupId }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContributions();
  }, [groupId]);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const data = await contributionService.getGroupContributions(groupId);
      setContributions(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load contributions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading contributions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Recent Contributions</h4>
      {contributions.length === 0 ? (
        <p className="text-gray-500">No contributions yet</p>
      ) : (
        contributions.map(contrib => (
          <ContributionCard key={contrib.id} contribution={contrib} />
        ))
      )}
    </div>
  );
};