import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getUserListings } from "../../api/listingApi";
import ListingGrid from "../../components/listings/ListingGrid.jsx";
import Button from "../../components/common/Button.jsx";

function UserDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getUserListings();
        setListings(data);
      } catch (err) {
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchListings();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1>Welcome, {user?.email}</h1>
          <h2>Your Listings</h2>
        </div>
        <Link to="/listings/new" style={{ textDecoration: "none" }}>
          <Button>Add Listing</Button>
        </Link>
      </div>
      <ListingGrid listings={listings} />
    </div>
  );
}

export default UserDashboard;
