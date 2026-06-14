import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally verify token with backend
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, expectedRole) => {
    try {
      const data = await loginUser(email, password);
      if (expectedRole && data.user?.role !== expectedRole) {
        throw new Error("Invalid role for this account");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  };

  const register = async (email, password) => {
    try {
      await registerUser(email, password);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }

    try {
      // Auto-login after a successful registration.
      await login(email, password);
    } catch (error) {
      throw new Error(
        error.message || "Registration succeeded, but login failed",
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
