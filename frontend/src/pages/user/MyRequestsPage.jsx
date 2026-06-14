import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { getUserRequests } from '../../api/userApi';

function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getUserRequests();
        setRequests(data);
      } catch (err) {
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchRequests();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Requests</h1>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id}>
              Listing: {req.listingId?.name} - Status: {req.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRequestsPage;