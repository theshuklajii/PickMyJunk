function SkeletonTableRow() {
  return (
    <div className="table-row">
      <div style={{ background: 'var(--border)', height: '20px', width: '30%', animation: 'pulse 1.5s infinite' }} />
      <div style={{ background: 'var(--border)', height: '20px', width: '20%', animation: 'pulse 1.5s infinite' }} />
    </div>
  );
}

export default SkeletonTableRow;