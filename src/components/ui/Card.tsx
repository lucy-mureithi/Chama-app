export const Card = ({ children, style = {} }) => {
  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginBottom: "1rem",
      ...style,
    }}>
      {children}
    </div>
  );
};
