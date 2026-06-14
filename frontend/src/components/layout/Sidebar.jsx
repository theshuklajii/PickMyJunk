import "../../styles/layout.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

function Sidebar({ className }) {
  const { user } = useContext(AuthContext);

  const linkStyle = {
    display: "block",
    padding: "1rem",
    color: "var(--text-main)",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "background 0.2s ease, color 0.2s ease",
  };

  const hoverStyle = {
    background: "var(--surface-soft)",
    color: "var(--primary)",
  };

  return (
    <aside
      className={`sidebar ${className}`}
      style={{ color: "var(--text-main)" }}
    >
      {user?.role === "user" && (
        <>
          <Link
            to="/dashboard"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Dashboard
          </Link>
          <Link
            to="/listings/new"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Add Listing
          </Link>
          <Link
            to="/requests/new"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            New Request
          </Link>
          <Link
            to="/requests"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            My Requests
          </Link>
          <Link
            to="/profile"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Profile
          </Link>
        </>
      )}
      {user?.role === "admin" && (
        <>
          <Link
            to="/admin"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/requests"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Requests
          </Link>
          <Link
            to="/admin/users"
            style={linkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Users
          </Link>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
