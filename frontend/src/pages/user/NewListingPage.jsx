import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../api/listingApi.js";
import Button from "../../components/common/Button.jsx";
import "../../styles/components/forms.css";

function NewListingPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ageInYears: "",
    defectPercentage: "",
    estimatedPrice: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createListing({
        ...formData,
        ageInYears: Number(formData.ageInYears),
        defectPercentage: Number(formData.defectPercentage),
        estimatedPrice: Number(formData.estimatedPrice),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>Add New Listing</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Item Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            min="0"
            placeholder="Age in years"
            value={formData.ageInYears}
            onChange={(e) =>
              setFormData({ ...formData, ageInYears: e.target.value })
            }
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Defect percentage"
            value={formData.defectPercentage}
            onChange={(e) =>
              setFormData({ ...formData, defectPercentage: e.target.value })
            }
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            min="0"
            placeholder="Estimated price"
            value={formData.estimatedPrice}
            onChange={(e) =>
              setFormData({ ...formData, estimatedPrice: e.target.value })
            }
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="form-input"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Listing"}
        </Button>
      </form>
    </div>
  );
}

export default NewListingPage;
