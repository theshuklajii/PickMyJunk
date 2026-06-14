function StatusBadge({ status }) {
  const color = status === 'available' ? 'var(--success)' : status === 'pending' ? 'var(--warning)' : 'var(--error)';
  return (
    <span style={{ background: color, color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
      {status}
    </span>
  );
}

export default StatusBadge;