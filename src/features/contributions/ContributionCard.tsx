import { formatDate, formatCurrency } from '../../utils/formatters';

export const ContributionCard = ({ contribution }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
      <div>
        <p className="font-medium">{contribution.userName}</p>
        <p className="text-sm text-gray-600">{formatDate(contribution.createdAt)}</p>
      </div>
      <p className="text-green-600 font-semibold">+{formatCurrency(contribution.amount)}</p>
    </div>
  );
};