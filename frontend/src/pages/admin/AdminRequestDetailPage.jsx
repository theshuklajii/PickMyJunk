import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestDetails, updateRequestStatus } from "../../api/adminApi.js";
import Button from "../../components/common/Button.jsx";

function AdminRequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    getRequestDetails(id)
      .then((data) => setRequest(data.request))
      .catch(() => setError("Failed to load request details"));
  }, [id]);

  if (error) return <div className="fade-in">{error}</div>;
  if (!request) return <div className="fade-in">Loading...</div>;

  const handleStatusChange = async (status) => {
    setSavingStatus(true);
    setError("");
    try {
      const updatedRequest = await updateRequestStatus(id, status);
      setRequest(updatedRequest);
      navigate("/admin/requests");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update request status",
      );
    } finally {
      setSavingStatus(false);
    }
  };

  return (
    <div className="fade-in">
      <h2>Request Details</h2>
      <p>ID: {request._id}</p>
      <p>Status: {request.status}</p>
      <p>Listing: {request.listingId?.name}</p>
      <p>User: {request.userId?.email}</p>
      <p>Message: {request.message}</p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "1.5rem",
        }}
      >
        <Button
          type="button"
          disabled={savingStatus || request.status === "approved"}
          onClick={() => handleStatusChange("approved")}
        >
          {savingStatus ? "Saving..." : "Approve"}
        </Button>
        <Button
          type="button"
          disabled={savingStatus || request.status === "rejected"}
          onClick={() => handleStatusChange("rejected")}
        >
          {savingStatus ? "Saving..." : "Reject"}
        </Button>
      </div>
    </div>
  );
}

export default AdminRequestDetailPage;
