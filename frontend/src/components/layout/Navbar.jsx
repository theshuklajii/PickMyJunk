import "../../styles/layout.css";

import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";

function Navbar({
  onToggleSidebar,
  showHamburger = false,
  layoutType = "public",
  activeSection = "",
  hideUserElements = false,
}) {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const linkStyle = (isActive) => ({
    color: isActive ? "var(--primary)" : "var(--text-main)",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    transition: "color 0.2s ease, text-decoration 0.2s ease",
    padding: "0.5rem",
    borderRadius: "4px",
  });

  const hoverStyle = {
    color: "var(--primary)",
    textDecoration: "underline",
  };

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin/login";

  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        {showHamburger && !isAuthPage && (
          <button
            className="hamburger"
            onClick={
              layoutType === "public"
                ? () => setMobileMenuOpen(!mobileMenuOpen)
                : onToggleSidebar
            }
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginRight: "1rem",
              color: "var(--accent)",
              display: "none",
            }}
          >
            ☰
          </button>
        )}
        <Link
          to="/"
          style={{ textDecoration: "none", color: "var(--primary)" }}
        >
          <h1>Pick My Junk</h1>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {layoutType === "public" && !isAuthPage && (
          <div
            style={{ display: "flex", gap: "1rem" }}
            className="desktop-links"
          >
            <a
              href="#about"
              style={linkStyle(activeSection === "about")}
              onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseOut={(e) =>
                Object.assign(
                  e.target.style,
                  linkStyle(activeSection === "about"),
                )
              }
            >
              About Us
            </a>
            <a
              href="#contact"
              style={linkStyle(activeSection === "contact")}
              onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseOut={(e) =>
                Object.assign(
                  e.target.style,
                  linkStyle(activeSection === "contact"),
                )
              }
            >
              Contact Us
            </a>
          </div>
        )}
        {layoutType === "public" && user && !isAuthPage && (
          <Link
            to={user.role === "admin" ? "/admin" : "/dashboard"}
            style={{ color: "var(--text-main)", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        )}
        <button
          onClick={toggleTheme}
          style={{
            background: "var(--surface)",
            color: "var(--text-main)",
            border: "1px solid var(--border)",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "var(--surface-soft)")
          }
          onMouseOut={(e) => (e.target.style.background = "var(--surface)")}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
        {user && !hideUserElements && !isAuthPage && (
          <button
            onClick={logout}
            className="btn"
            style={{ background: "var(--error)" }}
          >
            Logout
          </button>
        )}
      </div>
      {/* Mobile Menu Overlay for Landing Page */}
      {layoutType === "public" && mobileMenuOpen && !isAuthPage && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "1rem",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <a
            href="#about"
            style={linkStyle(activeSection === "about")}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </a>
          <a
            href="#contact"
            style={linkStyle(activeSection === "contact")}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </a>
          {user && (
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              style={linkStyle(false)}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
