import Card from '../common/Card.jsx';
import StatusBadge from '../common/StatusBadge.jsx';
import DefectBar from '../common/DefectBar.jsx';
import Button from '../common/Button.jsx';

function ListingCard({ listing }) {
  return (
    <Card className="fade-in">
      <span>{listing.category}</span>
      <h3>{listing.name}</h3>
      <p>Age: {listing.ageInYears} years</p>
      <DefectBar percentage={listing.defectPercentage} />
      <p>Est. Price:  ₹{listing.estimatedPrice}</p>
      <p>Location: {listing.location}</p>
      <StatusBadge status={listing.status} />
      <Button>View Details</Button>
    </Card>
  );
}

export default ListingCard;