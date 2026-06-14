function SkeletonCard() {
  return (
    <div style={{ background: 'var(--surface-soft)', borderRadius: '12px', padding: '1rem', height: '200px' }}>
      <div style={{ background: 'var(--border)', height: '20px', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }} />
      <div style={{ background: 'var(--border)', height: '15px', width: '80%', animation: 'pulse 1.5s infinite' }} />
    </div>
  );
}

export default SkeletonCard;