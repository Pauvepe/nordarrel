export default function Loading() {
  return (
    <div style={{ padding: 20 }}>
      <div className="skeleton" style={{ width: 200, height: 28, marginBottom: 20 }} />
      <div className="skeleton" style={{ width: "100%", height: 300 }} />
    </div>
  );
}
