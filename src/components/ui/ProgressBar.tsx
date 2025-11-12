export const ProgressBar = ({ current, total, label = "" }) => {
  const percentage = (current / total) * 100;
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && <p style={{ marginBottom: "0.5rem" }}>{label}</p>}
      <div style={{ width: "100%", height: "8px", backgroundColor: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${percentage}%`, backgroundColor: "#3b82f6", transition: "width 0.3s ease" }} />
      </div>
      <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>{current} / {total}</p>
    </div>
  );
};
