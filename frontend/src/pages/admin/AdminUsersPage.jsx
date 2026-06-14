import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/adminApi.js";
import SkeletonTableRow from "../../components/common/SkeletonTableRow.jsx";
import "../../styles/components/dashboard.css";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="fade-in">
      <h2>All Users</h2>
      {loading
        ? Array(3)
            .fill()
            .map((_, i) => <SkeletonTableRow key={i} />)
        : users.map((user) => (
            <div key={user._id} className="table-row">
              <span>{user.email}</span>
              <span>{user.role}</span>
            </div>
          ))}
    </div>
  );
}

export default AdminUsersPage;
