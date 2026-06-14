import "../../styles/components/listings.css";
import ListingCard from "./ListingCard.jsx";

function ListingGrid({ listings }) {
  return (
    <div className="listing-grid">
      {listings.map((listing) => (
        <ListingCard key={listing._id || listing.id} listing={listing} />
      ))}
    </div>
  );
}

export default ListingGrid;
