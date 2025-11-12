export const ProgressBar = ({ current, target, showLabel = true }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          <span>Progress: {percentage.toFixed(1)}%</span>
          <span>
            ${current.toLocaleString()} / ${target.toLocaleString()}
          </span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: '0.75rem',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: percentage >= 100 ? '#16a34a' : '#2563eb',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};
