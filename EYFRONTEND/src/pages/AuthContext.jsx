import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (store state in localStorage)
  useEffect(() => {
    const userStatus = localStorage.getItem("isAuthenticated"); // Fixed key name
    setIsLoggedIn(userStatus === "true");
  }, []);

  // Login function
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isAuthenticated", "true"); // Fixed key name
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuthenticated"); // Fixed key name
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
