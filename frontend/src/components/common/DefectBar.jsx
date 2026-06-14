import '../../styles/components/listings.css';

function DefectBar({ percentage }) {
  return (
    <div className="defect-bar">
      <div className="defect-fill" style={{ '--defect-percentage': `${percentage}%` }} />
    </div>
  );
}

export default DefectBar;