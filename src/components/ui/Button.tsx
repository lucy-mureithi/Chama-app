export const Button = ({ children, onClick, variant = "primary", style = {}, ...props }) => {
  const baseStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
  };

  const variants = {
    primary: { backgroundColor: "#3b82f6", color: "white" },
    secondary: { backgroundColor: "#e5e7eb", color: "#000" },
    danger: { backgroundColor: "#ef4444", color: "white" },
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant], ...style }} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
