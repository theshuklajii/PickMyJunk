import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import PublicLayout from "../components/layout/PublicLayout.jsx";
import UserLayout from "../components/layout/UserLayout.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import LandingPage from "../pages/public/LandingPage.jsx";
import LoginPage from "../pages/public/LoginPage.jsx";
import AdminLoginPage from "../pages/public/AdminLoginPage.jsx";
import RegisterPage from "../pages/public/RegisterPage.jsx";
import UserDashboard from "../pages/user/UserDashboard.jsx";
import NewListingPage from "../pages/user/NewListingPage.jsx";
import NewRequestPage from "../pages/user/NewRequestPage.jsx";
import ProfilePage from "../pages/user/ProfilePage.jsx";
import MyRequestsPage from "../pages/user/MyRequestsPage.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminRequestsPage from "../pages/admin/AdminRequestsPage.jsx";
import AdminRequestDetailPage from "../pages/admin/AdminRequestDetailPage.jsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";

function AppRouter() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const ProtectedRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PublicLayout>
              <AdminLoginPage />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <RegisterPage />
            </PublicLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/new"
          element={
            <ProtectedRoute>
              <UserLayout>
                <NewListingPage />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests/new"
          element={
            <ProtectedRoute>
              <UserLayout>
                <NewRequestPage />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <UserLayout>
                <MyRequestsPage />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserLayout>
                <ProfilePage />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminRequestsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminRequestDetailPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminUsersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
