import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllListings } from "../../api/listingApi";
import { createRequest } from "../../api/userApi.js";
import Button from "../../components/common/Button.jsx";
import "../../styles/components/forms.css";

function NewRequestPage() {
  const [formData, setFormData] = useState({ listingId: "", message: "" });
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingListings, setLoadingListings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getAllListings();
        setListings(data.filter((listing) => listing.status !== "sold"));
      } catch (err) {
        setError("Failed to load listings");
      } finally {
        setLoadingListings(false);
      }
    };

    fetchListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createRequest(formData.listingId, formData.message);
      navigate("/requests");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>New Request</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loadingListings ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No available listings yet.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              value={formData.listingId}
              onChange={(e) =>
                setFormData({ ...formData, listingId: e.target.value })
              }
              className="form-input"
              required
            >
              <option value="">Select a listing</option>
              {listings.map((listing) => (
                <option key={listing._id} value={listing._id}>
                  {listing.name} - {listing.category} - {listing.location}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="form-input"
              rows="4"
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default NewRequestPage;
