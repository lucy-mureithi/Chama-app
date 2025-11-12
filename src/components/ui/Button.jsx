export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  const variants = {
    primary: {
      backgroundColor: disabled ? '#93c5fd' : '#2563eb',
      color: 'white',
    },
    secondary: {
      backgroundColor: disabled ? '#d1d5db' : '#6b7280',
      color: 'white',
    },
    danger: {
      backgroundColor: disabled ? '#fca5a5' : '#dc2626',
      color: 'white',
    },
    success: {
      backgroundColor: disabled ? '#86efac' : '#16a34a',
      color: 'white',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '0.375rem',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s',
        ...variants[variant],
      }}
    >
      {children}
    </button>
  );
};