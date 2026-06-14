import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { getAllRequests, getAllUsers } from '../../api/adminApi';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqData = await getAllRequests();
        const userData = await getAllUsers();
        setRequests(reqData);
        setUsers(userData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'admin') fetchData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users: {users.length}</h2>
      <h2>Requests: {requests.length}</h2>
      {/* Add tables or lists for details */}
    </div>
  );
}

export default AdminDashboard;