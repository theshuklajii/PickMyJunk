import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/userApi.js";
import "../../styles/components/forms.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserProfile()
      .then((data) => setProfile(data.profile))
      .catch(() => setError("Failed to load profile"));
  }, []);

  if (error) return <div className="fade-in">{error}</div>;
  if (!profile) return <div className="fade-in">Loading...</div>;

  return (
    <div className="fade-in">
      <h2>My Profile</h2>
      <p>Name: {profile.name || "N/A"}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
}

export default ProfilePage;
