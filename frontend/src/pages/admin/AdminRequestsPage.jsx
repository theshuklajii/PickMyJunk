import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRequests } from "../../api/adminApi.js";
import SkeletonTableRow from "../../components/common/SkeletonTableRow.jsx";
import "../../styles/components/dashboard.css";

function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="fade-in">
      <h2>Pending Requests</h2>
      {loading
        ? Array(3)
            .fill()
            .map((_, i) => <SkeletonTableRow key={i} />)
        : requests.map((req) => (
            <div key={req._id} className="table-row">
              <span>Request {req._id}</span>
              <Link to={`/admin/requests/${req._id}`}>View Details</Link>
            </div>
          ))}
    </div>
  );
}

export default AdminRequestsPage;
