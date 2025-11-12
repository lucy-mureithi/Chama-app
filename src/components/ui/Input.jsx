export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  name,
  error,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151',
          }}
        >
          {label}
          {required && <span style={{ color: '#dc2626' }}> *</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: `1px solid ${error ? '#dc2626' : '#d1d5db'}`,
          borderRadius: '0.375rem',
          fontSize: '1rem',
          outline: 'none',
        }}
      />
      {error && (
        <span style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};
